import Pagination from "@/components/Pagination";
import BankSampahCard from "@/components/bank-sampah/BankSampahCard";
import BankSampahFilters from "@/components/bank-sampah/BankSampahFilters";
import { getBankSampahList } from "@/lib/actions/bank-sampah.action";

const BankSampahPage = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) => {
  const params = await searchParams;
  const query = params?.query || "";
  const filter = params?.filter || "all";
  const page = Number(params?.page) || 1;
  const pageSize = Number(params?.pageSize) || 6;

  const { success, data, error } = await getBankSampahList({
    page,
    pageSize,
    query,
    filter,
  });

  const banks = data?.banks || [];
  const isNext = data?.isNext || false;
  const wilayahFilters = data?.wilayahFilters || [
    { name: "Semua wilayah", value: "all" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium uppercase text-[#ff7000]">
          bank-sampah
        </p>
        <h1 className="h1-bold text-[#0f1117] dark:text-white">
          Lokasi Bank Sampah Jakarta
        </h1>
        <p className="text-[#7b8ec8] dark:text-[#dce3f1]">
          Data resmi Satu Data Jakarta: status, alamat, dan detail bank sampah.
        </p>
      </div>

      <BankSampahFilters filters={wilayahFilters} />

      {!success ? (
        <div className="flex flex-col items-start gap-3 rounded-lg border border-[#f4f6f8] bg-white p-6 dark:border-[#151821] dark:bg-[#0f1117]">
          <p className="text-lg font-semibold text-[#0f1117] dark:text-white">
            Gagal memuat data
          </p>
          <p className="text-sm text-[#7b8ec8] dark:text-[#dce3f1]">
            {error?.message || "Silakan coba lagi nanti"}
          </p>
        </div>
      ) : banks.length === 0 ? (
        <div className="flex flex-col items-start gap-3 rounded-lg border border-[#f4f6f8] bg-white p-6 dark:border-[#151821] dark:bg-[#0f1117]">
          <p className="text-lg font-semibold text-[#0f1117] dark:text-white">
            Tidak ada data yang cocok
          </p>
          <p className="text-sm text-[#7b8ec8] dark:text-[#dce3f1]">
            Coba ubah kata kunci atau filter status.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {banks.map((bank, idx) => (
            <BankSampahCard key={`${bank.nama_bank_sampah}-${idx}`} bank={bank} />
          ))}
        </div>
      )}

      <Pagination page={page} isNext={isNext} />
    </div>
  );
};

export default BankSampahPage;
