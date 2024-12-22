import { buyAction } from '@/actions/buy'
import { Button } from '../ui/button'

const CartBuy = ({
  totalPrice,
}: {
  totalPrice: number,
}) => {
  return (
    <form>
      <Button type="submit" formAction={() => buyAction(totalPrice)}>Buy</Button>
    </form>
  )
}

export default CartBuy