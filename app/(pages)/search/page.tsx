import getSongsByTitles from "../../actions/getSongsByTitles";
import Header from "../../layouts/Header";
import SearchInput from "../../layouts/SearchInput";
import SearchContent from "./layouts/SearchContent";

interface SearchProps {
  searchParams: {
    title: string;
  };
}

const index = async ({ searchParams }: SearchProps) => {
  const params = await searchParams;
  const songs = await getSongsByTitles(params.title);

  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header className="from-bg-neutral-900">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-3xl font-bold text-white">Search</h1>
        </div>
        <SearchInput />
        <SearchContent songs={songs} />
      </Header>
    </div>
  );
};

export default index;
