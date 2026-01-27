'use client'

import { useState } from 'react'
import { UserPlus, MoreVertical, Mail, Clock, Trash2 } from 'lucide-react'
import { inviteTeamMember, updateUserRole, removeTeamMember, cancelInvite } from '../actions'

interface TeamTabProps {
  currentUserId: string
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

export function TeamTab({ currentUserId, teamMembers, pendingInvites }: TeamTabProps) {
  const [inviteLoading, setInviteLoading] = useState(false)
  const [inviteMessage, setInviteMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  async function handleInvite(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setInviteLoading(true)
    setInviteMessage(null)

    const formData = new FormData(e.currentTarget)
    const result = await inviteTeamMember(formData)

    if (result.error) {
      setInviteMessage({ type: 'error', text: result.error })
    } else {
      setInviteMessage({ type: 'success', text: result.message || 'Invite sent successfully' })
      e.currentTarget.reset()
    }

    setInviteLoading(false)
  }

  async function handleRoleChange(userId: string, newRole: string) {
    setActionLoading(userId)
    const formData = new FormData()
    formData.set('userId', userId)
    formData.set('role', newRole)

    await updateUserRole(formData)
    setActionLoading(null)
    setOpenDropdown(null)
  }

  async function handleRemoveMember(userId: string) {
    if (!confirm('Are you sure you want to remove this team member? This action cannot be undone.')) {
      return
    }

    setActionLoading(userId)
    const formData = new FormData()
    formData.set('userId', userId)

    await removeTeamMember(formData)
    setActionLoading(null)
    setOpenDropdown(null)
  }

  async function handleCancelInvite(inviteId: string) {
    if (!confirm('Are you sure you want to cancel this invite?')) {
      return
    }

    setActionLoading(inviteId)
    const formData = new FormData()
    formData.set('inviteId', inviteId)

    await cancelInvite(formData)
    setActionLoading(null)
  }

  return (
    <div className="space-y-8">
      {/* Invite Form */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Invite Team Member</h3>
        <p className="text-sm text-gray-500 mb-4">Send an invitation to add a new team member.</p>

        {inviteMessage && (
          <div
            className={`mb-4 p-4 rounded-lg ${
              inviteMessage.type === 'success'
                ? 'bg-green-50 border border-green-200 text-green-600'
                : 'bg-red-50 border border-red-200 text-red-600'
            }`}
          >
            <p className="text-sm">{inviteMessage.text}</p>
          </div>
        )}

        <form onSubmit={handleInvite} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <input
              name="email"
              type="email"
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
              placeholder="Enter email address"
            />
          </div>
          <div className="sm:w-32">
            <select
              name="role"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none bg-white"
            >
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={inviteLoading}
            className="inline-flex items-center justify-center gap-2 bg-[#7a36dd] hover:bg-[#6b2cc4] text-white font-medium py-2.5 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <UserPlus className="h-4 w-4" />
            {inviteLoading ? 'Sending...' : 'Send Invite'}
          </button>
        </form>
      </div>

      {/* Pending Invites */}
      {pendingInvites.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Invites</h3>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg divide-y divide-yellow-200">
            {pendingInvites.map((invite) => (
              <div key={invite.id} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Mail className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{invite.email}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 capitalize">
                        {invite.role}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Expires {new Date(invite.expires_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleCancelInvite(invite.id)}
                  disabled={actionLoading === invite.id}
                  className="text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
                  title="Cancel invite"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Team Members */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Members</h3>
        <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-200">
          {teamMembers.map((member) => {
            const isCurrentUser = member.id === currentUserId
            return (
              <div key={member.id} className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-[#7a36dd]">
                      {(member.name || member.email).charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {member.name || member.email}
                      {isCurrentUser && (
                        <span className="ml-2 text-xs text-gray-400">(you)</span>
                      )}
                    </p>
                    <p className="text-sm text-gray-500">{member.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                      member.role === 'admin'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {member.role}
                  </span>

                  {!isCurrentUser && (
                    <div className="relative">
                      <button
                        onClick={() => setOpenDropdown(openDropdown === member.id ? null : member.id)}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
                        disabled={actionLoading === member.id}
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>

                      {openDropdown === member.id && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setOpenDropdown(null)}
                          />
                          <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                            <button
                              onClick={() => handleRoleChange(member.id, member.role === 'admin' ? 'editor' : 'admin')}
                              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              Make {member.role === 'admin' ? 'Editor' : 'Admin'}
                            </button>
                            <button
                              onClick={() => handleRemoveMember(member.id)}
                              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors"
                            >
                              Remove from team
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
