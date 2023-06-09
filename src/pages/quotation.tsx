import { type NextPage } from "next";
import Image from "next/image";

const Quotation: NextPage = () => {
  return (
    <main className="thom container mx-auto">
      <div className="kurt mx-72 my-20">
        <section className="flex items-center justify-center space-x-6">
          <div className="relative h-40 w-40">
            <Image src="/img/logo.jpeg" alt="Logo" fill />
          </div>
          <article className="leading-tight">
            <h1 className="whitespace-nowrap text-5xl font-bold uppercase italic tracking-tight">
              rekayasa kendali industri
            </h1>
            <h3 className="text-2xl">
              Automation Control and Project Support Solutions
            </h3>
            <h4>Capital Eight</h4>
            <h4 className="whitespace-nowrap">
              Jalan Duren Tiga Selatan No. 8, RT/RW. 004/002, Jakarta Selatan
              12760
            </h4>
            <h4 className="whitespace-nowrap">
              Phone/Fax: +62 21 7991183, HP: +62 811 978 8315
            </h4>
            <h4 className="whitespace-nowrap">
              Email: info@rekayasakendali.com
            </h4>
          </article>
        </section>
        <section className="mt-4">
          <h3 className="border-4 border-zinc-500 py-1 text-center text-2xl font-bold uppercase">
            q u o a t i o n
          </h3>
        </section>
        <section className="mt-4 flex items-start justify-between">
          <div className="w-1/3">
            <h3 className="text-xl">To</h3>
            <article>
              <h4 className="text-lg font-semibold">PT. Tetra Pak Indonesia</h4>
              <p>Tetra Pak Building 3rd Floor</p>
              <p className="">
                Jl. Buncit Raya Kav. 100 Pejaten Barat Pasar Minggu Jakarta
                Selatan 12510
              </p>
            </article>
            <p className="mt-8 text-lg">
              ATT :<span className="pl-4">Mr. Tri Wiono</span>
            </p>
          </div>
          <div className="w-1/4">
            <article className="border-4 border-zinc-500 px-2 py-1">
              <h3>NUM : QT230510-201/R0</h3>
              <h3>DATE : 05/10/2023</h3>
            </article>
            <article className="mt-8">
              <h3>REFFERENCE</h3>
              <h3>
                INQ NUM :<span className="pl-4">By Email</span>
              </h3>
              <h3>
                INQ DATE :<span className="pl-4">-</span>
              </h3>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Quotation;
