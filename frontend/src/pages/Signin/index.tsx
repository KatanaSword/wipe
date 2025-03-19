import SigninForm from "@/components/signin-form";
import { Image } from "@/components/ui";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const SigninPage = () => {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <section className="flex w-full items-center justify-center">
        <div className="w-[450px]">
          <AspectRatio ratio={16 / 9} className="bg-muted">
            <Image src="" alt="" className="h-full w-full object-cover" />
          </AspectRatio>
        </div>
        <div className="flex items-center justify-center">
          <SigninForm />
        </div>
      </section>
    </main>
  );
};

export default SigninPage;
