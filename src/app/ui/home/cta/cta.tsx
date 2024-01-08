import {Button} from "@nextui-org/react";

export default function Cta() {
  return (
    <section className="w-full h-screen flex flex-col items-center justify-start relative
                        lg:justify-start lg:items-start lg:px-20 lg:py-20 
                      ">

      <article className="font-bold text-white ">
        <h1 className=" text-xl">
        Welcome to the official website of Golgoths 13 Basketball Club, where passion meets precision on the court! 
        </h1>
        <br />
        <h2 className=" text-lg">
        As a proud and dynamic basketball community, Golgoths 13 is more than just a club – it&apos;s a family united by the love for the game.
        </h2>
      </article>

      <aside className="mt-20 grid grid-cols-2 gap-4">

        <Button color="primary" variant="shadow" data-hover="Last">
          <a href="#lastNews">Last news</a>
        </Button>
        <Button color="primary" variant="shadow">
          <a href="#banner">Become a member</a>
        </Button>
        <Button color="primary" variant="shadow">
          <a href="#hero">Last result</a>
        </Button>
        <Button color="primary" variant="shadow">
          <a href="#hero">Next match</a>
        </Button>
    </aside>

  </section>
  )
}
