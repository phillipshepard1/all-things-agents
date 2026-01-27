'use client'

import { useState } from 'react'
import { User, Users, Shield } from 'lucide-react'
import { ProfileTab } from './profile-tab'
import { TeamTab } from './team-tab'
import { SecurityTab } from './security-tab'

interface SettingsTabsProps {
  user: {
    id: string
    email: string
    name: string
    role: string
  }
  isAdmin: boolean
  teamMembers: {
    id: string
    email: string
    name: string | null
    role: string
    created_at: string
  }[]
  pendingInvites: {
    id: string
    email: string
    role: string
    created_at: string
    expires_at: string
  }[]
}

export function SettingsTabs({ user, isAdmin, teamMembers, pendingInvites }: SettingsTabsProps) {
  const [activeTab, setActiveTab] = useState('profile')

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    ...(isAdmin ? [{ id: 'team', name: 'Team', icon: Users }] : []),
    { id: 'security', name: 'Security', icon: Shield },
  ]

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px" aria-label="Tabs">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  group inline-flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors
                  ${isActive
                    ? 'border-[#7a36dd] text-[#7a36dd]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <tab.icon className={`h-4 w-4 ${isActive ? 'text-[#7a36dd]' : 'text-gray-400 group-hover:text-gray-500'}`} />
                {tab.name}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'profile' && (
          <ProfileTab user={user} />
        )}
        {activeTab === 'team' && isAdmin && (
          <TeamTab
            currentUserId={user.id}
            teamMembers={teamMembers}
            pendingInvites={pendingInvites}
          />
        )}
        {activeTab === 'security' && (
          <SecurityTab />
        )}
      </div>
    </div>
  )
}
