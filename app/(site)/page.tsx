import getSongs from "../actions/getSongs";
import Header from "../layouts/Header";
import ListItem from "../layouts/ListItem";
import PageContent from "../layouts/PageContent";

export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs();
  return (
    <div className="rounded-lg bg-neutral-900 h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <div className="mb-2 text-white">
          <h1 className="text-3xl font-bold">Welcome back!</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
            <ListItem
              image="/images/like.jpeg"
              name={"Liked Songs"}
              href="liked"
            />
          </div>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6 text-white">
        <div className="flex justify-between items-center">
          <h1>Newest songs</h1>
        </div>
        <PageContent songs={songs} />
      </div>
    </div>
  );
}
