import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area"
import { Separator } from "~/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"

import { PlusCircle } from "lucide-react"
import Layout from "~/components/template/layout"
import { Button } from "~/components/ui/button"

export default function MusicPage() {
  return (
    <Layout title="Dashboard">
      <div className="h-full px-4 py-6 lg:px-8">
        <Tabs defaultValue="music" className="h-full space-y-6">
          <div className="space-between flex items-center">
            <TabsList>
              <TabsTrigger value="music" className="relative">
                Music
              </TabsTrigger>
              <TabsTrigger value="podcasts">Podcasts</TabsTrigger>
              <TabsTrigger value="live" disabled>
                Live
              </TabsTrigger>
            </TabsList>
            <div className="ml-auto mr-4">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add music
              </Button>
            </div>
          </div>
          <TabsContent
            value="music"
            className="border-none p-0 outline-none"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Listen Now
                </h2>
                <p className="text-sm text-muted-foreground">
                  Top picks for you. Updated daily.
                </p>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="relative">
              <ScrollArea>
                <div className="flex space-x-4 pb-4">

                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
            <article>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque ad, iusto praesentium dicta excepturi qui, animi quaerat eveniet dolorem, delectus quia! Soluta laboriosam sequi voluptatum praesentium, eveniet dignissimos quasi perspiciatis!</p>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque ad, iusto praesentium dicta excepturi qui, animi quaerat eveniet dolorem, delectus quia! Soluta laboriosam sequi voluptatum praesentium, eveniet dignissimos quasi perspiciatis!</p>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque ad, iusto praesentium dicta excepturi qui, animi quaerat eveniet dolorem, delectus quia! Soluta laboriosam sequi voluptatum praesentium, eveniet dignissimos quasi perspiciatis!</p>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque ad, iusto praesentium dicta excepturi qui, animi quaerat eveniet dolorem, delectus quia! Soluta laboriosam sequi voluptatum praesentium, eveniet dignissimos quasi perspiciatis!</p>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque ad, iusto praesentium dicta excepturi qui, animi quaerat eveniet dolorem, delectus quia! Soluta laboriosam sequi voluptatum praesentium, eveniet dignissimos quasi perspiciatis!</p>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque ad, iusto praesentium dicta excepturi qui, animi quaerat eveniet dolorem, delectus quia! Soluta laboriosam sequi voluptatum praesentium, eveniet dignissimos quasi perspiciatis!</p>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque ad, iusto praesentium dicta excepturi qui, animi quaerat eveniet dolorem, delectus quia! Soluta laboriosam sequi voluptatum praesentium, eveniet dignissimos quasi perspiciatis!</p>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque ad, iusto praesentium dicta excepturi qui, animi quaerat eveniet dolorem, delectus quia! Soluta laboriosam sequi voluptatum praesentium, eveniet dignissimos quasi perspiciatis!</p>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque ad, iusto praesentium dicta excepturi qui, animi quaerat eveniet dolorem, delectus quia! Soluta laboriosam sequi voluptatum praesentium, eveniet dignissimos quasi perspiciatis!</p>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque ad, iusto praesentium dicta excepturi qui, animi quaerat eveniet dolorem, delectus quia! Soluta laboriosam sequi voluptatum praesentium, eveniet dignissimos quasi perspiciatis!</p>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque ad, iusto praesentium dicta excepturi qui, animi quaerat eveniet dolorem, delectus quia! Soluta laboriosam sequi voluptatum praesentium, eveniet dignissimos quasi perspiciatis!</p>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque ad, iusto praesentium dicta excepturi qui, animi quaerat eveniet dolorem, delectus quia! Soluta laboriosam sequi voluptatum praesentium, eveniet dignissimos quasi perspiciatis!</p>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque ad, iusto praesentium dicta excepturi qui, animi quaerat eveniet dolorem, delectus quia! Soluta laboriosam sequi voluptatum praesentium, eveniet dignissimos quasi perspiciatis!</p>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque ad, iusto praesentium dicta excepturi qui, animi quaerat eveniet dolorem, delectus quia! Soluta laboriosam sequi voluptatum praesentium, eveniet dignissimos quasi perspiciatis!</p>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque ad, iusto praesentium dicta excepturi qui, animi quaerat eveniet dolorem, delectus quia! Soluta laboriosam sequi voluptatum praesentium, eveniet dignissimos quasi perspiciatis!</p>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque ad, iusto praesentium dicta excepturi qui, animi quaerat eveniet dolorem, delectus quia! Soluta laboriosam sequi voluptatum praesentium, eveniet dignissimos quasi perspiciatis!</p>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque ad, iusto praesentium dicta excepturi qui, animi quaerat eveniet dolorem, delectus quia! Soluta laboriosam sequi voluptatum praesentium, eveniet dignissimos quasi perspiciatis!</p>
            </article>
          </TabsContent>
          <TabsContent
            value="podcasts"
            className="h-full flex-col border-none p-0 data-[state=active]:flex"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">
                  New Episodes
                </h2>
                <p className="text-sm text-muted-foreground">
                  Your favorite podcasts. Updated daily.
                </p>
              </div>
            </div>
            <Separator className="my-4" />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}