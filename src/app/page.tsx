import FileUpload from "@/components/FileUpload";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-r from-slate-500 to-slate-800">
        <h1 className="text-6xl text-white font-bold">Discord Arbiter</h1>
        <FileUpload/>
        <p className="text-white font-s">
          Arbiter will analyze your files and set up the bot for you.
        </p>
    </main>
  );
}
