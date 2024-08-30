import { getServerSession } from 'next-auth'
import LeftSideBar from '../../components/WalletPage/LeftSideBar'
import RightSideBar from '../../components/WalletPage/RightSideBar'
import TopBar from '../../components/WalletPage/TopBar'
import WalletDetail from '../../components/WalletPage/WalletDetail'
import { createWallet } from '@/services/walletService'
import prisma from '@/db'
const Wallet = async() => {
  const session = await getServerSession()

  if(session){
    const email = session.user?.email ?? undefined
    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    }) 
    if(user){
      const wallet = await createWallet(user)
      console.log(wallet)
    }
  }
  
  return (
    <div>
      <div>
        <TopBar />
      </div>
      <div className="flex justify-between pt-10">
        <div className="hidden sm:block">
          <LeftSideBar />
        </div>
        <div>
          <WalletDetail />
        </div>
        <div className="pr-15 hidden md:block">
          <RightSideBar />
        </div>
      </div>
    </div>
  )
}

export default Wallet
