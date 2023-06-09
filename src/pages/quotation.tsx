import { type NextPage } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";

const QuotPdf = dynamic(() => import("~/components/pdf-quotation"), {
  ssr: false,
});

const Quotation: NextPage = () => {
  const [data] = useState([
    {
      no: 1,
      desc: "UNITRONIC BUS DN THIN Y,DifaceNet",
      qty: 80,
      unit: "M",
      price: 81_000,
      amount: 6_480_000,
    },
    {
      no: 2,
      desc: "Terminal Weidmuller Tingkat",
      qty: 100,
      unit: "Pcs",
      price: 31_000,
      amount: 3_100_000,
    },
    {
      no: 3,
      desc: "Cable Ties CV- 150 ( 3,6X150mm) Putih KSS",
      qty: 10,
      unit: "Pack",
      price: 22_000,
      amount: 220_000,
    },
    {
      no: 4,
      desc: "Cable Ties CV- 150 ( 2,5X100mm) Putih KSS",
      qty: 10,
      unit: "Pack",
      price: 12_000,
      amount: 9_920_000,
    },
  ]);

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  return (
    <main className="thom container mx-auto">
      <div className="kurt mx-72 my-20">
        <section className="flex items-center justify-center gap-x-6 space-x-6">
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
        <section className="mt-4 flex flex-row items-start justify-between">
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
        <section className="mt-4">
          <table className="min-w-full text-left text-slate-700">
            <thead className="border-b border-slate-700 font-semibold text-slate-700">
              <tr>
                {["no", "description", "qty", "unit", "price", "amount"].map(
                  (th, i) => (
                    <th className="px-6 py-2 capitalize" scope="col" key={i}>
                      {th}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {data.map((d) => (
                <tr className="border-b border-slate-700" key={d.no}>
                  <td className="whitespace-nowrap px-6 py-4">{d.no}</td>
                  <td className="whitespace-nowrap px-6 py-4">{d.desc}</td>
                  <td className="whitespace-nowrap px-6 py-4">{d.qty}</td>
                  <td className="whitespace-nowrap px-6 py-4">{d.unit}</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {formatter.format(d.price)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {formatter.format(d.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-8 flex flex-col items-end divide-y-2 font-semibold text-slate-500">
            <div className="flex w-1/4 justify-between">
              <p>Sub Total :</p>
              <p>{formatter.format(9_920_000)}</p>
            </div>
            <div className="flex w-1/4 justify-between">
              <p>
                Disc :<span className="pl-2">0%</span>
              </p>
              <p>-</p>
            </div>
            <div className="flex w-1/4 justify-between">
              <p>
                Vat :<span className="pl-2">11%</span>
              </p>
              <p>{formatter.format(1_091_200)}</p>
            </div>
            <div className="flex w-1/4 justify-between">
              <p>Total :</p>
              <p>{formatter.format(11_011_200)}</p>
            </div>
          </div>
        </section>
      </div>
      <section>
        <QuotPdf />
      </section>
    </main>
  );
};

export default Quotation;
