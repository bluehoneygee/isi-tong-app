import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";

const HomePage = async () => {
  const session = await auth();
  console.log(session);

  return (
    <>
      <h1 className="font-bold font-inter text-5xl">Welcome</h1>
      <h1 className=" font-grotesk text-5xl">Welcome</h1>
      <h1 className=" text-5xl">Welcome</h1>
      <h1 className=" text-5xl font-inter">Welcome</h1>
      <form
        className="px-10 pt-[100px]"
        action={async () => {
          "use server";
          await signOut({
            redirectTo: ROUTES.SIGN_IN,
          });
        }}
      >
        <Button type="submit">Logout</Button>
      </form>
    </>
  );
};

export default HomePage;
