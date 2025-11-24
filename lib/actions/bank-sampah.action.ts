"use server";

import { PaginatedSearchParamsSchema } from "../validations";
import handleError from "../handlers/error";
import action from "../handlers/action";
import {
  ActionResponse,
  ErrorResponse,
  PaginatedSearchParams,
} from "@/types/global";

export type BankSampah = {
  periode_data?: string;
  wilayah?: string;
  kecamatan?: string;
  kelurahan?: string;
  alamat?: string;
  nama_bank_sampah?: string;
  kegiatan?: string;
  status_kegiatan?: string;
  keterangan?: string;
};

const BANK_SAMPAH_API =
  "https://ws.jakarta.go.id/gateway/DataPortalSatuDataJakarta/1.0/satudata?kategori=dataset&tipe=detail&url=data-lokasi-bank-sampah";

const revalidate = 60 * 60; // once per hour

function filterBanks(
  banks: BankSampah[],
  query: string,
  wilayahFilter: string
): BankSampah[] {
  const q = query?.toLowerCase() ?? "";
  const wilayah = wilayahFilter?.toLowerCase();

  return banks.filter((item) => {
    const text =
      [
        item.nama_bank_sampah,
        item.wilayah,
        item.kecamatan,
        item.kelurahan,
        item.alamat,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase() ?? "";

    const matchQuery = q ? text.includes(q) : true;
    const matchWilayah =
      wilayah && wilayah !== "all"
        ? (item.wilayah || "").toLowerCase() === wilayah
        : true;

    return matchQuery && matchWilayah;
  });
}

async function fetchBankSampah(): Promise<BankSampah[]> {
  const res = await fetch(BANK_SAMPAH_API, {
    next: { revalidate },
  });

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  const json = await res.json();
  return Array.isArray(json?.data) ? json.data : [];
}

export async function getBankSampahList(
  params: PaginatedSearchParams
): Promise<
  ActionResponse<{
    banks: BankSampah[];
    isNext: boolean;
    wilayahFilters: { name: string; value: string }[];
  }>
> {
  const validationResult = await action({
    params,
    schema: PaginatedSearchParamsSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { page = 1, pageSize = 10, query = "", filter = "all" } = params;

  try {
    const banks = await fetchBankSampah();

    const wilayahFilters = [
      { name: "Semua wilayah", value: "all" },
      ...Array.from(
        new Set(
          banks
            .map((b) => b.wilayah)
            .filter((w): w is string => Boolean(w && w.trim()))
        )
      ).map((w) => ({ name: w, value: w.toLowerCase() })),
    ];

    const filtered = filterBanks(banks, query, filter);
    const start = (Number(page) - 1) * Number(pageSize);
    const paginated = filtered.slice(start, start + Number(pageSize));
    const isNext = filtered.length > start + paginated.length;

    return {
      success: true,
      data: {
        banks: JSON.parse(JSON.stringify(paginated)),
        isNext,
        wilayahFilters,
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

