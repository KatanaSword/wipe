import SignupForm from "@/components/signup-form";
import { Image } from "@/components/ui";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const SignupPage = () => {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <section className="flex w-full items-center justify-center">
        <div className="w-[450px]">
          <AspectRatio ratio={16 / 9} className="bg-muted">
            <Image src="" alt="" className="h-full w-full object-cover" />
          </AspectRatio>
        </div>
        <div className="flex items-center justify-center">
          <SignupForm />
        </div>
      </section>
    </main>
  );
};

export default SignupPage;
