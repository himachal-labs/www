import { redirect } from 'next/navigation'

export async function generateStaticParams() {
  return [
    { id: 'demo' },
    { id: 'example' },
  ]
}

interface Props {
  params: Promise<{ id: string }>
}

export default async function FriendInvitePage({ params }: Props) {
  const { id } = await params
  const appStoreUrl = "https://apps.apple.com/app/moneytide/"
  const deepLink = `moneytide://invite/friend/${id}`
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md mx-auto text-center p-6">
        <h1 className="text-2xl font-bold mb-4">Friend Invitation</h1>
        <p className="text-gray-600 mb-6">
          You&apos;ve been invited to connect on MoneyTide!
        </p>
        <div className="space-y-4">
          <a 
            href={deepLink}
            className="block w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition"
          >
            Open in MoneyTide App
          </a>
          <a 
            href={appStoreUrl}
            className="block w-full bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition"
          >
            Download MoneyTide
          </a>
        </div>
      </div>
    </div>
  )
}