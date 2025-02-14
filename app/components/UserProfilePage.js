'use client'

import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'

export default function ProfilePage() {
  const { isLoaded, isSignedIn, user } = useUser()
  const [ordersCount, setOrdersCount] = useState(0)
  const profileRef = useRef(null)

  useEffect(() => {
    if (isLoaded && user) {
      const pcNumbersCount = user?.unsafeMetadata?.pcNumbers?.length || 0
      setOrdersCount(pcNumbersCount)
    }
  }, [isLoaded, user])

  if (!isLoaded || !isSignedIn) {
    return null
  }

  const { imageUrl, firstName, lastName, emailAddresses, createdAt, username } = user

  // Determine account creation date
  const accountCreationDate = new Date(createdAt).toLocaleDateString()

  // Determine rewards based on orders count
  const rewards = []
  if (ordersCount > 1)
    rewards.push({
      name: 'Bronze Kunde',
      image: '/bronze.png',
      description: 'Du hast mehr als 2 Bestellungen getätigt. Vielen Dank für deinen Support!',
    })
  if (ordersCount > 3)
    rewards.push({
      name: 'Silber Kunde',
      image: '/silber.png',
      description: 'Du hast mehr als 3 Bestellungen getätigt. Vielen Dank für deinen Support!',
    })
  if (ordersCount > 5)
    rewards.push({
      name: 'Gold Kunde',
      image: '/gold.png',
      description: 'Du hast mehr als 5 Bestellungen getätigt. Vielen Dank für deinen Support!',
    })
  if (ordersCount > 10)
    rewards.push({
      name: 'Diamant Kunde',
      image: '/diamond.png',
      description: 'Du hast mehr als 10 Bestellungen getätigt. Vielen Dank für deinen Support!',
    })

  // Special reward for accounts created before 31.06.2025
  const isSpecialReward = new Date(createdAt) < new Date('2025-06-31')
  if (isSpecialReward) {
    rewards.push({
      name: 'OG',
      image: '/og.png',
      description: 'Spezialbelohnung für Konten, die vor dem 31.06.2025 erstellt wurden',
    })
  }

  return (
    <div className="container max-w-2xl mx-auto p-4">
      <div className="bg-card border-2 border-white rounded-lg p-6 space-y-6" ref={profileRef}>
        {/* Profile Picture Section */}
        <div className="space-y-4">
          <div className="relative mx-auto h-24 w-24 md:h-32 md:w-32">
            <Image
              src={user.imageUrl}
              alt="Profilbild"
              width={128}
              height={128}
              className="rounded-full border-4 border-white shadow-md"
            />
          </div>
        </div>

        <div className="h-px bg-gray-200" />

        {/* Profile Information */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Name</label>
            <p className="font-medium text-primary">{firstName} {lastName}</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-500">Benutzername</label>
            <p className="font-medium text-primary">@{username}</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-500">Konto erstellt am</label>
            <p className="font-medium text-primary">{accountCreationDate}</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-500">Email</label>
            <div>
              {emailAddresses.map((email) => (
                <p key={email.emailAddress} className="text-primary">{email.emailAddress}</p>
              ))}
            </div>
          </div>

          {/* Orders Count */}
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Bestellungen</label>
            <p className="font-medium text-primary">{ordersCount} Bestellungen</p>
          </div>

          {/* Rewards */}
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Auszeichnungen</label>
            <div className="flex space-x-2 relative">
              {rewards.map((reward) => (
                <div
                  key={reward.name}
                  className="relative group"
                >
                  <Image
                    src={reward.image}
                    alt={reward.name}
                    width={30}
                    height={30}
                    className="rounded-md"
                  />
                  <div className="absolute left-1/2 bottom-full transform -translate-x-1/2 -translate-y-2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {reward.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
