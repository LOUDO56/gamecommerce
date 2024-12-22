import { Game } from '@prisma/client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import OnPlatform from './on-platform'
import { getCountOfItem, isInCart } from '@/actions/cart'
import CartController from '@/components/cart/cart-controller'

const GameInfoCard = async ({
    gameInfo
}: {
    gameInfo: Game | null
}) => {

  const inCart = await isInCart(gameInfo?.id as string);
  const itemCount = await getCountOfItem(gameInfo?.id as string);

  return (
    <div className='flex lg:flex-row flex-col gap-5 items-center lg:items-stretch'>
      <div className='w-full aspect-[3/4] max-w-[250px] lg:max-w-[350px] mx-auto md:mx-0'>
        <img 
          src={gameInfo?.imageUrl} 
          alt={`Game ${gameInfo?.title} cover`} 
          className='w-full h-full object-cover shadow-lg'
        />
      </div>
      <Card className='w-full lg:w-[30rem] mx-auto md:mx-0 flex flex-col justify-between'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>Buy {gameInfo?.title}</CardTitle>
          <CardDescription>{gameInfo?.stock} items available.</CardDescription>
          <div className='flex gap-2 flex-wrap pt-5'>
            {gameInfo?.platforms.map((platform) => (
              <OnPlatform key={platform}>{platform}</OnPlatform>
            ))}
          </div>
        </CardHeader>
        <CardContent>
        </CardContent>
        <CardFooter>
          <div className='flex flex-col gap-3 w-full'>
            <span className='text-sm'>Get your code instantly after buying</span>
            <span className='text-sm'> eligible for every platform!</span>
            <span className='text-4xl font-bold'>${gameInfo?.price}</span>
            <CartController 
              item={{
                id: gameInfo?.id as string,
                title: gameInfo?.title,
                price: gameInfo?.price,
                quantity: itemCount as number
              }} 
              inCartParam={inCart}
            />
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default GameInfoCard

