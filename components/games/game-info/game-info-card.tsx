import { Game } from '@prisma/client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import OnPlatform from './on-platform'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'


const GameInfoCard = ({
    gameInfo
}: {
    gameInfo: Game | null
}) => {
  return (
    <div className='flex gap-10'>
      <div className='w-[450px]'>
        <img src={gameInfo?.imageUrl} alt={`Game ${gameInfo?.title} cover`} />
      </div>
      <Card className='w-[450px] flex flex-col h-full justify-between'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>Buy {gameInfo?.title}</CardTitle>
          <CardDescription>{gameInfo?.stock} items available.</CardDescription>
          <div className='flex gap-2 flex-wrap pt-5'>
            {gameInfo?.platforms.map((platform) => (
              <OnPlatform key={platform}>{platform}</OnPlatform>
            ))}
          </div>
        </CardHeader>
        <CardContent className='flex flex-col gap-5'>
          
        </CardContent>
        <CardFooter>
          <div className='flex flex-col gap-3 w-full'>
            <span className='text-sm'>Get your code instantly after buying eligible for every platform!</span>
            <span className='text-4xl font-bold'>${gameInfo?.price}</span>
            <Button className='flex items-center gap-2 w-full'>
              <ShoppingCart />
              <span>Add to cart</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default GameInfoCard