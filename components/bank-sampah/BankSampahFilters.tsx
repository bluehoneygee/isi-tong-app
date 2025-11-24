import CommonFilter from "@/components/filters/CommonFilter";
import LocalSearch from "@/components/search/LocalSearch";

interface Filter {
  name: string;
  value: string;
}

interface Props {
  filters: Filter[];
}

const BankSampahFilters = ({ filters }: Props) => (
  <section className="flex flex-col gap-4 sm:flex-row sm:items-center">
    <LocalSearch
      route="/bank-sampah"
      imgSrc="/icons/search.svg"
      placeholder="Cari nama, wilayah, kecamatan, atau kelurahan..."
      otherClasses="flex-1"
    />
    <CommonFilter
      filters={filters}
      otherClasses="min-h-[56px] sm:min-w-[170px]"
      placeholder="Pilih lokasi berdasarkan wilayah"
    />
  </section>
);

export default BankSampahFilters;

