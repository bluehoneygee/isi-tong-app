import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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

interface Props {
  bank: BankSampah;
  className?: string;
}

const BankSampahCard = ({ bank, className }: Props) => (
  <article
    className={cn(
      "border-[#f4f6f8] dark:border-[#151821] bg-white dark:bg-[#0f1117] flex flex-col gap-2 rounded-xl border p-5 shadow-[0_6px_20px_0_rgba(184,184,184,0.06)] dark:shadow-[0_2px_10px_0_rgba(46,52,56,0.20)]",
      className
    )}
  >
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-base font-semibold text-[#0f1117] dark:text-white">
          {bank.nama_bank_sampah || "Tanpa nama"}
        </p>
        <p className="text-xs text-[#7b8ec8] dark:text-[#dce3f1]">
          {bank.periode_data ? `Periode ${bank.periode_data}` : "-"}
        </p>
      </div>
      <Badge
        className={cn(
          "text-xs capitalize",
          (bank.status_kegiatan || "").toLowerCase() === "aktif"
            ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200"
            : "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200"
        )}
      >
        {bank.status_kegiatan || "Tidak diketahui"}
      </Badge>
    </div>

    <p className="text-sm text-[#101012] dark:text-[#dce3f1]">
      {bank.alamat || "Alamat tidak tersedia"}
    </p>

    <div className="flex flex-wrap gap-2 text-xs text-[#7b8ec8] dark:text-[#dce3f1]">
      {bank.wilayah && <Badge variant="outline">{bank.wilayah}</Badge>}
      {bank.kecamatan && (
        <Badge variant="outline">Kec. {bank.kecamatan}</Badge>
      )}
      {bank.kelurahan && <Badge variant="outline">Kel. {bank.kelurahan}</Badge>}
    </div>

    {bank.kegiatan && (
      <p className="text-xs text-[#7b8ec8] dark:text-[#dce3f1]">
        Kegiatan: {bank.kegiatan}
      </p>
    )}
  </article>
);

export default BankSampahCard;

