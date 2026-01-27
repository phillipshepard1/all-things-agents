"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Search, Plus, Filter, Check, Pin, Mail, Phone, Calendar, FileText, Trash2, Edit2, Menu } from "lucide-react";
import { Browser } from "@/components/ui/browser";
import { cn } from "@/lib/utils";

// Common app header component
function AppHeader({ activeTab }: { activeTab: string }) {
  const tabs = ["Follow Ups", "Contacts", "Leads", "To-dos", "Transactions", "Calendar", "Notes"];

  return (
    <div className="flex items-center gap-1 bg-[#7C3AED] px-3 py-2">
      <Menu className="h-4 w-4 text-white/80 mr-1" />
      <div className="text-white font-bold text-sm mr-4">CK</div>
      {tabs.map((tab) => (
        <button
          key={tab}
          className={cn(
            "px-2.5 py-1.5 rounded-md text-[10px] font-medium transition-colors",
            activeTab === tab
              ? "bg-white/20 text-white"
              : "text-white/70 hover:text-white hover:bg-white/10"
          )}
        >
          {tab}
        </button>
      ))}
      <div className="flex-1" />
      <div className="flex items-center gap-1.5 bg-white/10 rounded-md px-2 py-1">
        <Search className="h-3 w-3 text-white/60" />
        <span className="text-[10px] text-white/60">Search... (⌘K)</span>
      </div>
    </div>
  );
}

// Avatar component
function Avatar({ initials, className }: { initials: string; className?: string }) {
  return (
    <div className={cn(
      "flex items-center justify-center rounded-full bg-[#7C3AED]/10 text-[10px] font-semibold text-[#7C3AED]",
      className
    )}>
      {initials}
    </div>
  );
}

// Badge component
function Badge({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "green" | "orange" | "purple" }) {
  const variants = {
    default: "bg-gray-100 text-gray-600",
    green: "bg-green-100 text-green-700",
    orange: "bg-orange-100 text-orange-700",
    purple: "bg-[#7C3AED]/10 text-[#7C3AED]",
  };
  return (
    <span className={cn("px-2 py-0.5 rounded-full text-[9px] font-medium", variants[variant])}>
      {children}
    </span>
  );
}

// ============ SCREEN COMPONENTS ============

function ContactsScreen() {
  const contacts = [
    { initials: "AR", name: "Ashley Robinson", email: "ashley.robinson@icloud.com", phone: "(774) 727-9855", type: "agent", groups: "—", pinned: true },
    { initials: "KA", name: "Karen Anderson", email: "karenanderson@yahoo.com", phone: "(632) 616-4827", type: "agent", groups: "—", pinned: true },
    { initials: "AM", name: "Aiden Martin", email: "aiden.martin@gmail.com", phone: "(312) 555-0101", type: "buyer", groups: "Referral Sources", pinned: true },
    { initials: "NW", name: "Nancy Walker", email: "nancy_walker@gmail.com", phone: "(269) 959-4012", type: "seller", groups: "—", pinned: false },
    { initials: "SR", name: "Susan Roberts", email: "susan52@yahoo.com", phone: "(725) 767-6662", type: "investor", groups: "—", pinned: false },
    { initials: "AA", name: "Andrew Allen", email: "andrewallen@aol.com", phone: "(808) 632-8664", type: "renter", groups: "Expired Listings, First-Time Buyers +8", pinned: false },
    { initials: "GM", name: "Grace Martin", email: "grace.martin@outlook.com", phone: "(312) 555-0104", type: "investor", groups: "VIP Clients", pinned: false },
  ];

  return (
    <div className="flex h-full flex-col bg-white font-sans">
      <AppHeader activeTab="Contacts" />
      <div className="flex-1 p-4 overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-lg font-bold text-foreground font-display">Contacts</h1>
            <p className="text-[10px] text-muted-foreground">Manage your contacts, groups, and archived items</p>
          </div>
          <div className="flex gap-2">
            <button className="px-2.5 py-1.5 text-[10px] border border-gray-200 rounded-md text-gray-600">Export CSV</button>
            <button className="px-2.5 py-1.5 text-[10px] border border-gray-200 rounded-md text-gray-600">Import</button>
            <button className="px-2.5 py-1.5 text-[10px] bg-[#7C3AED] text-white rounded-md flex items-center gap-1">
              <Plus className="h-3 w-3" /> Add Contact
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3 bg-gray-50 rounded-md px-3 py-2">
          <Search className="h-3.5 w-3.5 text-gray-400" />
          <span className="text-[10px] text-gray-400">Search contacts by name, email, or phone...</span>
        </div>

        <div className="flex gap-4 mb-3 border-b border-gray-100 pb-2">
          <span className="text-[10px] font-medium text-[#7C3AED] border-b-2 border-[#7C3AED] pb-2">Contacts (50)</span>
          <span className="text-[10px] text-gray-400 pb-2">Pinned (5)</span>
          <span className="text-[10px] text-gray-400 pb-2">Groups (10)</span>
        </div>

        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-[10px]">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-3 py-2 font-medium text-muted-foreground">Contact</th>
                <th className="text-left px-3 py-2 font-medium text-muted-foreground">Contact Info</th>
                <th className="text-left px-3 py-2 font-medium text-muted-foreground">Contact Type</th>
                <th className="text-left px-3 py-2 font-medium text-muted-foreground">Groups</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, i) => (
                <tr key={i} className="border-t border-border/50 hover:bg-muted/30">
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <Avatar initials={contact.initials} className="h-7 w-7" />
                      <span className="font-medium text-foreground">{contact.name}</span>
                      {contact.pinned && <Pin className="h-3 w-3 text-[#7C3AED]" />}
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Mail className="h-3 w-3" /> {contact.email}
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Phone className="h-3 w-3" /> {contact.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <Badge variant={contact.type === "agent" ? "purple" : contact.type === "seller" ? "green" : contact.type === "investor" ? "orange" : "default"}>
                      {contact.type}
                    </Badge>
                  </td>
                  <td className="px-3 py-2 text-muted-foreground">{contact.groups}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function FollowUpsScreen() {
  const followUps = [
    { initials: "AM", name: "Aiden Martin", type: "Birthday", date: "Jun 2", notes: "Turning 45" },
    { initials: "GM", name: "Grace Martin", type: "Housiversary", date: "Jun 3", notes: "2 years in home" },
    { initials: "OT", name: "Owen Thompson", type: "Call", date: "Jun 4", notes: "Check on listing" },
    { initials: "VT", name: "Victoria Thompson", type: "Follow Up", date: "Jun 5", notes: "Sent market report" },
    { initials: "CG", name: "Charlotte Gray", type: "Meeting", date: "Jun 6", notes: "Buyer consultation" },
    { initials: "JL", name: "James Lee", type: "Birthday", date: "Jun 7", notes: "Client anniversary" },
  ];

  return (
    <div className="flex h-full flex-col bg-white font-sans">
      <AppHeader activeTab="Follow Ups" />
      <div className="flex-1 p-4 overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-lg font-bold text-foreground font-display">Follow Ups</h1>
            <p className="text-[10px] text-muted-foreground">Manage and track your contact follow ups</p>
          </div>
          <div className="flex gap-2">
            <button className="px-2.5 py-1.5 text-[10px] border border-gray-200 rounded-md text-gray-600">Export CSV</button>
            <button className="px-2.5 py-1.5 text-[10px] bg-[#7C3AED] text-white rounded-md flex items-center gap-1">
              <Plus className="h-3 w-3" /> Add Follow Up
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3 bg-gray-50 rounded-md px-3 py-2">
          <Search className="h-3.5 w-3.5 text-gray-400" />
          <span className="text-[10px] text-gray-400">Search by contact name or follow up...</span>
        </div>

        <div className="flex gap-4 mb-3 border-b border-gray-100 pb-2">
          <span className="text-[10px] font-medium text-[#7C3AED] border-b-2 border-[#7C3AED] pb-2">This Week (6)</span>
          <span className="text-[10px] text-gray-400 pb-2">Catch Up (2)</span>
          <span className="text-[10px] text-gray-400 pb-2">Coming Up (3)</span>
        </div>

        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-[10px]">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-3 py-2 font-medium text-muted-foreground">Contact</th>
                <th className="text-left px-3 py-2 font-medium text-muted-foreground">Type</th>
                <th className="text-left px-3 py-2 font-medium text-muted-foreground">Date</th>
                <th className="text-left px-3 py-2 font-medium text-muted-foreground">Notes</th>
              </tr>
            </thead>
            <tbody>
              {followUps.map((item, i) => (
                <tr key={i} className="border-t border-border/50 hover:bg-muted/30">
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <Avatar initials={item.initials} className="h-7 w-7" />
                      <span className="font-medium text-foreground">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <Badge variant="purple">{item.type}</Badge>
                  </td>
                  <td className="px-3 py-2 text-muted-foreground">{item.date}</td>
                  <td className="px-3 py-2 text-muted-foreground">{item.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function LeadsScreen() {
  const leads = [
    { initials: "MS", name: "Mary Smith", email: "mary3@outlook.com", phone: "(522) 713-9078", score: "10/10", nextFollowUp: "Tomorrow", lastFollowUp: "—" },
    { initials: "DC", name: "Donald Campbell", email: "donaldcampbell@gmail.com", phone: "(579) 689-9847", score: "9/10", nextFollowUp: "Jun 5", lastFollowUp: "—" },
    { initials: "KC", name: "Karen Clark", email: "karen.clark@gmail.com", phone: "(933) 212-1503", score: "7/10", nextFollowUp: "—", lastFollowUp: "May 28" },
    { initials: "CG", name: "Charlotte Gray", email: "charlotte.gray@email.com", phone: "(312) 555-0199", score: "6/10", nextFollowUp: "Jun 8", lastFollowUp: "—" },
    { initials: "SR", name: "Susan Roberts", email: "susan52@yahoo.com", phone: "(725) 767-6662", score: "5/10", nextFollowUp: "—", lastFollowUp: "May 25" },
    { initials: "MW", name: "Michelle Wilson", email: "michelle_wilson@icloud.com", phone: "(892) 605-9690", score: "5/10", nextFollowUp: "—", lastFollowUp: "—" },
    { initials: "NW", name: "Nancy Walker", email: "nancy_walker@gmail.com", phone: "(269) 959-4012", score: "4/10", nextFollowUp: "Jun 10", lastFollowUp: "May 20" },
  ];

  return (
    <div className="flex h-full flex-col bg-white font-sans">
      <AppHeader activeTab="Leads" />
      <div className="flex-1 p-4 overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-lg font-bold text-foreground font-display">Leads</h1>
            <p className="text-[10px] text-muted-foreground">Total: 10 leads</p>
          </div>
          <button className="px-2.5 py-1.5 text-[10px] bg-[#7C3AED] text-white rounded-md flex items-center gap-1">
            <Plus className="h-3 w-3" /> Add Lead
          </button>
        </div>

        <div className="flex items-center gap-2 mb-3 bg-gray-50 rounded-md px-3 py-2">
          <Search className="h-3.5 w-3.5 text-gray-400" />
          <span className="text-[10px] text-gray-400">Search by name, email, or phone...</span>
        </div>

        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-[10px]">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-3 py-2 font-medium text-muted-foreground">Name</th>
                <th className="text-left px-3 py-2 font-medium text-muted-foreground">Contact Info</th>
                <th className="text-left px-3 py-2 font-medium text-muted-foreground">Score</th>
                <th className="text-left px-3 py-2 font-medium text-muted-foreground">Next Follow Up</th>
                <th className="text-left px-3 py-2 font-medium text-muted-foreground">Last Follow Up</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead, i) => (
                <tr key={i} className="border-t border-border/50 hover:bg-muted/30">
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <Avatar initials={lead.initials} className="h-7 w-7" />
                      <span className="font-medium text-foreground">{lead.name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Mail className="h-3 w-3" /> {lead.email}
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Phone className="h-3 w-3" /> {lead.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <span className={cn(
                      "font-semibold",
                      parseInt(lead.score) >= 8 ? "text-green-600" : parseInt(lead.score) >= 5 ? "text-orange-500" : "text-red-500"
                    )}>
                      {lead.score}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-muted-foreground">{lead.nextFollowUp}</td>
                  <td className="px-3 py-2 text-muted-foreground">{lead.lastFollowUp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function TodosScreen() {
  const todos = [
    { task: "Pick up staging materials", time: "9:00 AM", done: true },
    { task: "Draft listing description for 800 W Belmont", time: "11:00 AM", done: false },
    { task: "Coordinate photography with vendor", time: "2:00 PM", done: false },
    { task: "Send follow-up emails to open house attendees", time: "4:00 PM", done: false },
    { task: "Call Aiden Martin about showing feedback", time: "5:00 PM", done: false },
    { task: "Review contract for 303 W Ohio St", time: "Tomorrow", done: false },
  ];

  return (
    <div className="flex h-full flex-col bg-white font-sans">
      <AppHeader activeTab="To-dos" />
      <div className="flex-1 p-4 overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-lg font-bold text-foreground font-display">To-dos</h1>
            <p className="text-[10px] text-muted-foreground">Manage your tasks and reminders</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1.5 border border-gray-200 rounded-md text-gray-400">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <button className="p-1.5 border border-gray-200 rounded-md text-gray-400">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            </button>
            <button className="px-2.5 py-1.5 text-[10px] bg-[#7C3AED] text-white rounded-md flex items-center gap-1">
              <Plus className="h-3 w-3" /> Add To-do
            </button>
          </div>
        </div>

        <div className="flex gap-4 mb-3 border-b border-gray-100 pb-2">
          <span className="text-[10px] font-medium text-[#7C3AED] border-b-2 border-[#7C3AED] pb-2">Current (6)</span>
          <span className="text-[10px] text-gray-400 pb-2">Catch Up (2)</span>
          <span className="text-[10px] text-gray-400 pb-2">Completed (12)</span>
        </div>

        <div className="space-y-2">
          {todos.map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/30">
              <div className={cn(
                "flex h-5 w-5 shrink-0 items-center justify-center rounded border-2",
                item.done ? "border-[#7C3AED] bg-[#7C3AED]" : "border-border bg-white"
              )}>
                {item.done && <Check className="h-3 w-3 text-white" />}
              </div>
              <div className="flex-1">
                <span className={cn(
                  "text-[11px] font-medium",
                  item.done ? "text-muted-foreground line-through" : "text-foreground"
                )}>
                  {item.task}
                </span>
              </div>
              <span className="text-[10px] text-muted-foreground">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TransactionsScreen() {
  const columns = [
    { name: "New Leads", count: 2, total: "$920K", color: "text-purple-600", deals: [
      { address: "800 W Belmont", city: "Chicago, IL", price: "$450K", date: "Dec 21, 2025" },
      { address: "1122 Main St", city: "Chicago, IL", price: "$470K", date: "Dec 28, 2025" },
    ]},
    { name: "Qualified", count: 1, total: "$450K", color: "text-purple-500", deals: [
      { address: "303 W Ohio St", city: "Chicago, IL", price: "$450K", buyer: "James Lee" },
    ]},
    { name: "Under Contract", count: 1, total: "$778K", color: "text-purple-400", deals: [
      { address: "53 Briarmeadow St", city: "Farmington, AR", price: "$778K", buyer: "Donald Robinson", date: "Jan 1, 2026" },
    ]},
    { name: "Closing", count: 1, total: "$470K", color: "text-purple-300", deals: [
      { address: "1400 S Michigan", city: "Chicago, IL", price: "$470K", date: "Dec 30, 2025" },
    ]},
    { name: "Closed", count: 1, total: "$250K", color: "text-green-500", deals: [
      { address: "1 S State St", city: "Chicago, IL", price: "$250K" },
    ]},
    { name: "Cancelled", count: 0, total: "", color: "text-gray-400", deals: [] },
  ];

  return (
    <div className="flex h-full flex-col bg-white font-sans">
      <AppHeader activeTab="Transactions" />
      <div className="flex-1 p-4 overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-lg font-bold text-foreground font-display">Transaction Pipeline</h1>
            <p className="text-[10px] text-muted-foreground">6 active deals • $3,318,000 total value</p>
          </div>
          <div className="flex gap-2">
            <button className="px-2.5 py-1.5 text-[10px] border border-gray-200 rounded-md text-gray-600 flex items-center gap-1">
              <Plus className="h-3 w-3" /> Add Column
            </button>
            <button className="px-2.5 py-1.5 text-[10px] bg-[#7C3AED] text-white rounded-md flex items-center gap-1">
              <Plus className="h-3 w-3" /> Add Transaction
            </button>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2">
          {columns.map((column, i) => (
            <div key={i} className="flex-shrink-0 w-[160px] bg-muted/50 rounded-lg p-2">
              <div className="flex items-center justify-between mb-1">
                <span className={cn("text-[10px] font-semibold", column.color)}>{column.name}</span>
                <span className="text-[9px] text-muted-foreground">({column.count})</span>
              </div>
              {column.total && (
                <div className="text-[9px] text-muted-foreground mb-2">{column.total}</div>
              )}
              <div className="space-y-2">
                {column.deals.length > 0 ? column.deals.map((deal, j) => (
                  <div key={j} className="bg-white rounded-md p-2 shadow-sm border border-border">
                    <div className="text-[10px] font-medium text-foreground truncate">{deal.address}</div>
                    <div className="text-[9px] text-muted-foreground">{deal.city}</div>
                    <div className="text-[10px] font-semibold text-green-600 mt-1">{deal.price}</div>
                    {"buyer" in deal && deal.buyer && <Badge variant="purple">{deal.buyer}</Badge>}
                    {"date" in deal && deal.date && <div className="text-[8px] text-muted-foreground mt-1">Close: {deal.date}</div>}
                  </div>
                )) : (
                  <div className="text-[9px] text-muted-foreground text-center py-4">No transactions</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function NotesScreen() {
  const notes = [
    { title: "Buyer Consultation Notes", time: "2 days ago", contact: "Aiden Martin", preview: "Looking for 3BR/2BA in Lincoln Park. Budget $450-550K. Preapproved with Chase. Wants move-in ready, no major renovations." },
    { title: "Listing Presentation Prep", time: "3 days ago", contact: "Grace Martin", preview: "Comparable sales: 800 W Belmont ($465K), 1122 Main ($470K). Recommend list price $459K. Staging scheduled for Thursday." },
    { title: "Open House Follow-Up", time: "4 days ago", contact: "James Lee", preview: "Very interested in 303 W Ohio St. Wants to schedule second showing with spouse. Mentioned timeline of 60 days." },
    { title: "Seller Meeting Notes", time: "5 days ago", contact: "Victoria Thompson", preview: "Motivated seller - relocating for work in March. Flexible on closing date. Property needs minor repairs before listing." },
    { title: "Market Analysis Request", time: "1 week ago", contact: "Owen Thompson", preview: "Requested CMA for rental property at 1400 S Michigan. Considering selling vs continuing to rent. Follow up with numbers." },
  ];

  return (
    <div className="flex h-full flex-col bg-white font-sans">
      <AppHeader activeTab="Notes" />
      <div className="flex-1 p-4 overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-lg font-bold text-foreground font-display">Notes</h1>
            <p className="text-[10px] text-muted-foreground">Capture and organize your thoughts</p>
          </div>
          <button className="px-2.5 py-1.5 text-[10px] bg-[#7C3AED] text-white rounded-md flex items-center gap-1">
            <Plus className="h-3 w-3" /> Add Note
          </button>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 flex-1 bg-gray-50 rounded-md px-3 py-2 mr-3">
            <Search className="h-3.5 w-3.5 text-gray-400" />
            <span className="text-[10px] text-gray-400">Search notes...</span>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-1.5 border border-gray-200 rounded-md text-gray-400 bg-gray-100">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <button className="p-1.5 border border-gray-200 rounded-md text-gray-400">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            </button>
          </div>
        </div>

        <div className="flex gap-4 mb-3 border-b border-gray-100 pb-2">
          <span className="text-[10px] font-medium text-[#7C3AED] border-b-2 border-[#7C3AED] pb-2">All Notes (5)</span>
          <span className="text-[10px] text-gray-400 pb-2">Pinned (2)</span>
        </div>

        <div className="space-y-2">
          {notes.map((note, i) => (
            <div key={i} className="p-3 rounded-lg border border-border hover:bg-muted/30">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="text-[11px] font-semibold text-foreground">{note.title}</div>
                  <div className="text-[9px] text-muted-foreground mt-0.5">{note.time}</div>
                  {note.preview && (
                    <div className="text-[10px] text-muted-foreground mt-1 line-clamp-2">{note.preview}</div>
                  )}
                  <div className="mt-2">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] text-[9px]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#7C3AED]" />
                      {note.contact}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 ml-2">
                  <button className="p-1 text-muted-foreground hover:text-foreground"><Pin className="h-3 w-3" /></button>
                  <button className="p-1 text-muted-foreground hover:text-foreground"><Edit2 className="h-3 w-3" /></button>
                  <button className="p-1 text-muted-foreground hover:text-red-500"><Trash2 className="h-3 w-3" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CalendarScreen() {
  const events = [
    { day: "Friday, December 27", items: [
      { time: "9:00 AM", title: "Follow-up with Aiden Martin", contact: "Aiden Martin" },
      { time: "11:00 AM", title: "Open House Prep", location: "303 W Ohio St" },
      { time: "2:00 PM", title: "Client Meeting", contact: "Grace Martin" },
    ]},
    { day: "Saturday, December 28", items: [
      { time: "10:00 AM", title: "Open House", location: "303 W Ohio St" },
      { time: "3:00 PM", title: "Follow-up Calls", contact: "Multiple" },
    ]},
    { day: "Monday, December 30", items: [
      { time: "9:30 AM", title: "Closing", location: "1400 S Michigan" },
    ]},
  ];

  return (
    <div className="flex h-full flex-col bg-white font-sans">
      <AppHeader activeTab="Calendar" />
      <div className="flex-1 p-4 overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <div>
              <h1 className="text-lg font-bold text-foreground font-display">Calendar</h1>
              <p className="text-[10px] text-muted-foreground">Manage your events and appointments</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <button className="p-1 rounded border border-gray-200 text-gray-400 hover:bg-gray-50">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="p-1 rounded border border-gray-200 text-gray-400 hover:bg-gray-50">
              <ChevronRight className="h-4 w-4" />
            </button>
            <button className="px-2.5 py-1 text-[10px] border border-gray-200 rounded-md text-gray-600">Today</button>
            <span className="text-[11px] font-medium text-gray-700 ml-2">12/27/2025 – 01/26/2026</span>
          </div>
          <div className="flex items-center gap-1">
            <button className="px-2 py-1 text-[10px] text-gray-500 rounded-md hover:bg-gray-100">Month</button>
            <button className="px-2 py-1 text-[10px] text-gray-500 rounded-md hover:bg-gray-100">Week</button>
            <button className="px-2 py-1 text-[10px] text-gray-500 rounded-md hover:bg-gray-100">Day</button>
            <button className="px-2 py-1 text-[10px] bg-gray-800 text-white rounded-md">Agenda</button>
            <button className="ml-2 px-2.5 py-1.5 text-[10px] bg-[#7C3AED] text-white rounded-md flex items-center gap-1">
              <Plus className="h-3 w-3" /> Add Event
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {events.map((day, i) => (
            <div key={i}>
              <div className="text-[11px] font-semibold text-foreground mb-2">{day.day}</div>
              <div className="space-y-1.5">
                {day.items.map((event, j) => (
                  <div key={j} className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/50 hover:bg-muted">
                    <span className="text-[10px] text-muted-foreground w-16">{event.time}</span>
                    <div className="flex-1">
                      <span className="text-[11px] font-medium text-foreground">{event.title}</span>
                      {event.contact && <span className="text-[10px] text-[#7C3AED] ml-2">- {event.contact}</span>}
                      {event.location && <span className="text-[10px] text-muted-foreground ml-2">@ {event.location}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============ MOBILE-OPTIMIZED SCREEN COMPONENTS ============
// Simplified versions with card layouts, larger text, fewer items

function MobileAppHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between bg-[#7C3AED] px-3 py-2">
      <div className="flex items-center gap-2">
        <Menu className="h-4 w-4 text-white/80" />
        <div className="text-white font-bold text-sm">CK</div>
      </div>
      <span className="text-white text-sm font-medium">{title}</span>
      <Search className="h-4 w-4 text-white/80" />
    </div>
  );
}

function FollowUpsMobileScreen() {
  const followUps = [
    { initials: "AM", name: "Aiden Martin", type: "Birthday", date: "Jun 2" },
    { initials: "GM", name: "Grace Martin", type: "Housiversary", date: "Jun 3" },
    { initials: "OT", name: "Owen Thompson", type: "Call", date: "Jun 4" },
  ];

  return (
    <div className="flex h-full flex-col bg-white font-sans">
      <MobileAppHeader title="Follow Ups" />
      <div className="flex-1 p-3 overflow-hidden">
        <div className="flex gap-2 mb-3 border-b border-gray-100 pb-2">
          <span className="text-[11px] font-medium text-[#7C3AED] border-b-2 border-[#7C3AED] pb-1">This Week</span>
          <span className="text-[11px] text-gray-400 pb-1">Catch Up</span>
          <span className="text-[11px] text-gray-400 pb-1">Coming Up</span>
        </div>
        <div className="space-y-2">
          {followUps.map((item, i) => (
            <div key={i} className="flex items-center justify-between rounded-xl bg-gray-50 p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#7C3AED]/10 text-xs font-semibold text-[#7C3AED]">
                  {item.initials}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">{item.name}</div>
                  <div className="text-xs text-[#7C3AED]">{item.type}</div>
                </div>
              </div>
              <div className="text-xs text-gray-400">{item.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContactsMobileScreen() {
  const contacts = [
    { initials: "AR", name: "Ashley Robinson", type: "agent" },
    { initials: "AM", name: "Aiden Martin", type: "buyer" },
    { initials: "GM", name: "Grace Martin", type: "investor" },
  ];

  return (
    <div className="flex h-full flex-col bg-white font-sans">
      <MobileAppHeader title="Contacts" />
      <div className="flex-1 p-3 overflow-hidden">
        <div className="flex gap-2 mb-3">
          {["All", "Buyer", "Seller"].map((filter, i) => (
            <span key={i} className={cn(
              "rounded-full px-3 py-1 text-[10px] font-medium",
              i === 0 ? "bg-[#7C3AED] text-white" : "bg-gray-100 text-gray-600"
            )}>
              {filter}
            </span>
          ))}
        </div>
        <div className="space-y-2">
          {contacts.map((contact, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#7C3AED]/10 text-xs font-semibold text-[#7C3AED]">
                {contact.initials}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                <Badge variant={contact.type === "agent" ? "purple" : contact.type === "investor" ? "orange" : "default"}>
                  {contact.type}
                </Badge>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LeadsMobileScreen() {
  const leads = [
    { initials: "MS", name: "Mary Smith", score: "10/10", followUp: "Tomorrow" },
    { initials: "DC", name: "Donald Campbell", score: "9/10", followUp: "Jun 5" },
    { initials: "KC", name: "Karen Clark", score: "7/10", followUp: "—" },
  ];

  return (
    <div className="flex h-full flex-col bg-white font-sans">
      <MobileAppHeader title="Leads" />
      <div className="flex-1 p-3 overflow-hidden">
        <div className="text-xs text-gray-500 mb-3">10 total leads</div>
        <div className="space-y-2">
          {leads.map((lead, i) => (
            <div key={i} className="flex items-center justify-between rounded-xl bg-gray-50 p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#7C3AED]/10 text-xs font-semibold text-[#7C3AED]">
                  {lead.initials}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                  <div className="text-xs text-gray-500">Follow up: {lead.followUp}</div>
                </div>
              </div>
              <div className={cn(
                "text-sm font-bold",
                parseInt(lead.score) >= 8 ? "text-green-600" : "text-orange-500"
              )}>
                {lead.score}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TodosMobileScreen() {
  const todos = [
    { task: "Pick up staging materials", time: "9:00 AM", done: true },
    { task: "Draft listing description", time: "11:00 AM", done: false },
    { task: "Coordinate photography", time: "2:00 PM", done: false },
  ];

  return (
    <div className="flex h-full flex-col bg-white font-sans">
      <MobileAppHeader title="To-dos" />
      <div className="flex-1 p-3 overflow-hidden">
        <div className="flex gap-2 mb-3 border-b border-gray-100 pb-2">
          <span className="text-[11px] font-medium text-[#7C3AED] border-b-2 border-[#7C3AED] pb-1">Current (6)</span>
          <span className="text-[11px] text-gray-400 pb-1">Completed</span>
        </div>
        <div className="space-y-2">
          {todos.map((item, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
              <div className={cn(
                "flex h-5 w-5 shrink-0 items-center justify-center rounded border-2",
                item.done ? "border-[#7C3AED] bg-[#7C3AED]" : "border-gray-300 bg-white"
              )}>
                {item.done && <Check className="h-3 w-3 text-white" />}
              </div>
              <div className="flex-1">
                <span className={cn(
                  "text-sm",
                  item.done ? "text-gray-400 line-through" : "text-gray-900 font-medium"
                )}>
                  {item.task}
                </span>
              </div>
              <span className="text-xs text-gray-400">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TransactionsMobileScreen() {
  const deals = [
    { address: "800 W Belmont", price: "$450K", stage: "New Lead", color: "bg-purple-100 text-purple-700" },
    { address: "303 W Ohio St", price: "$450K", stage: "Qualified", color: "bg-purple-50 text-purple-600" },
    { address: "1400 S Michigan", price: "$470K", stage: "Closing", color: "bg-green-100 text-green-700" },
  ];

  return (
    <div className="flex h-full flex-col bg-white font-sans">
      <MobileAppHeader title="Transactions" />
      <div className="flex-1 p-3 overflow-hidden">
        <div className="text-xs text-gray-500 mb-3">6 deals • $3.3M total</div>
        <div className="space-y-2">
          {deals.map((deal, i) => (
            <div key={i} className="rounded-xl bg-gray-50 p-3">
              <div className="flex items-center justify-between mb-1">
                <div className="text-sm font-medium text-gray-900">{deal.address}</div>
                <div className="text-sm font-bold text-green-600">{deal.price}</div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Chicago, IL</span>
                <span className={cn("text-[10px] font-medium px-2 py-0.5 rounded-full", deal.color)}>
                  {deal.stage}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CalendarMobileScreen() {
  const events = [
    { time: "9:00 AM", title: "Follow-up with Aiden Martin", contact: "Aiden Martin" },
    { time: "11:00 AM", title: "Open House Prep", location: "303 W Ohio St" },
    { time: "2:00 PM", title: "Client Meeting", contact: "Grace Martin" },
  ];

  return (
    <div className="flex h-full flex-col bg-white font-sans">
      <MobileAppHeader title="Calendar" />
      <div className="flex-1 p-3 overflow-hidden">
        <div className="text-xs font-semibold text-gray-700 mb-3">Friday, December 27</div>
        <div className="space-y-2">
          {events.map((event, i) => (
            <div key={i} className="flex items-start gap-3 rounded-xl bg-gray-50 p-3">
              <span className="text-xs text-gray-500 w-16 shrink-0">{event.time}</span>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900">{event.title}</div>
                {event.contact && <div className="text-xs text-[#7C3AED]">{event.contact}</div>}
                {event.location && <div className="text-xs text-gray-500">@ {event.location}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function NotesMobileScreen() {
  const notes = [
    { title: "Buyer Consultation Notes", time: "2 days ago", contact: "Aiden Martin" },
    { title: "Listing Presentation Prep", time: "3 days ago", contact: "Grace Martin" },
    { title: "Open House Follow-Up", time: "4 days ago", contact: "James Lee" },
  ];

  return (
    <div className="flex h-full flex-col bg-white font-sans">
      <MobileAppHeader title="Notes" />
      <div className="flex-1 p-3 overflow-hidden">
        <div className="flex gap-2 mb-3 border-b border-gray-100 pb-2">
          <span className="text-[11px] font-medium text-[#7C3AED] border-b-2 border-[#7C3AED] pb-1">All Notes</span>
          <span className="text-[11px] text-gray-400 pb-1">Pinned</span>
        </div>
        <div className="space-y-2">
          {notes.map((note, i) => (
            <div key={i} className="rounded-xl bg-gray-50 p-3">
              <div className="flex items-start justify-between mb-1">
                <div className="text-sm font-medium text-gray-900">{note.title}</div>
                <span className="text-[10px] text-gray-400">{note.time}</span>
              </div>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] text-[10px]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#7C3AED]" />
                {note.contact}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Screen definitions for desktop
const screens = [
  { id: "followups", label: "Follow Ups", url: "app.clientkeeper.com/follow-ups", component: FollowUpsScreen },
  { id: "contacts", label: "Contacts", url: "app.clientkeeper.com/contacts", component: ContactsScreen },
  { id: "leads", label: "Leads", url: "app.clientkeeper.com/leads", component: LeadsScreen },
  { id: "todos", label: "To-dos", url: "app.clientkeeper.com/todos", component: TodosScreen },
  { id: "transactions", label: "Transactions", url: "app.clientkeeper.com/transactions", component: TransactionsScreen },
  { id: "calendar", label: "Calendar", url: "app.clientkeeper.com/calendar", component: CalendarScreen },
  { id: "notes", label: "Notes", url: "app.clientkeeper.com/notes", component: NotesScreen },
];

// Mobile screen definitions (simplified versions)
const mobileScreens = [
  { id: "followups", label: "Follow Ups", url: "app.clientkeeper.com/follow-ups", component: FollowUpsMobileScreen },
  { id: "contacts", label: "Contacts", url: "app.clientkeeper.com/contacts", component: ContactsMobileScreen },
  { id: "leads", label: "Leads", url: "app.clientkeeper.com/leads", component: LeadsMobileScreen },
  { id: "todos", label: "To-dos", url: "app.clientkeeper.com/todos", component: TodosMobileScreen },
  { id: "transactions", label: "Transactions", url: "app.clientkeeper.com/transactions", component: TransactionsMobileScreen },
  { id: "calendar", label: "Calendar", url: "app.clientkeeper.com/calendar", component: CalendarMobileScreen },
  { id: "notes", label: "Notes", url: "app.clientkeeper.com/notes", component: NotesMobileScreen },
];

// Auto-advancing carousel with bottom navigation for mobile
function BrowserMobileCarousel({
  screenList,
  variant
}: {
  screenList: typeof screens;
  variant: "simplified" | "desktop";
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? screenList.length - 1 : prev - 1));
  }, [screenList.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === screenList.length - 1 ? 0 : prev + 1));
  }, [screenList.length]);

  // Auto-advance every 4 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      goToNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, goToNext]);

  // Pause on interaction, resume after 8 seconds
  const handleInteraction = () => {
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 8000);
  };

  const CurrentScreen = screenList[currentIndex].component;

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Screen label */}
      <div className="text-center">
        <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
          {screenList[currentIndex].label}
        </span>
      </div>

      {/* Browser with content */}
      <div className="relative w-full max-w-sm mx-auto">
        <Browser url={screenList[currentIndex].url}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              <CurrentScreen />
            </motion.div>
          </AnimatePresence>
        </Browser>
      </div>

      {/* Bottom navigation: [<] dots [>] */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => { handleInteraction(); goToPrev(); }}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-muted/50 text-muted-foreground transition-colors hover:bg-muted"
          aria-label="Previous screen"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex gap-1.5">
          {screenList.map((_, i) => (
            <button
              key={i}
              onClick={() => { handleInteraction(); setCurrentIndex(i); }}
              className={cn(
                "h-2 w-2 rounded-full transition-colors",
                i === currentIndex ? "bg-accent" : "bg-muted hover:bg-muted-foreground/30"
              )}
              aria-label={`Go to screen ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => { handleInteraction(); goToNext(); }}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-muted/50 text-muted-foreground transition-colors hover:bg-muted"
          aria-label="Next screen"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

// Static preview for mobile - shows single screen without interactivity
function BrowserStaticPreview() {
  // Show the first screen (Follow Ups) as the representative preview
  const previewScreen = screens[0];
  const PreviewScreenComponent = previewScreen.component;

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Screen label */}
      <div className="text-center">
        <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
          Desktop Preview
        </span>
      </div>

      {/* Browser with static content */}
      <div className="relative w-full max-w-md mx-auto">
        <Browser url={previewScreen.url}>
          <PreviewScreenComponent />
        </Browser>
      </div>
    </div>
  );
}

// Interactive carousel for tablet/desktop
function BrowserInteractiveCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? screens.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === screens.length - 1 ? 0 : prev + 1));
  };

  const CurrentScreen = screens[currentIndex].component;

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Screen label */}
      <div className="text-center">
        <span className="rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
          {screens[currentIndex].label}
        </span>
      </div>

      {/* Carousel container */}
      <div className="flex items-center gap-4 md:gap-8 w-full">
        {/* Left arrow */}
        <button
          onClick={goToPrev}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted/50 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:h-12 md:w-12"
          aria-label="Previous screen"
        >
          <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
        </button>

        {/* Browser with content */}
        <div className="relative flex-1 max-w-[640px] lg:max-w-4xl mx-auto">
          <Browser url={screens[currentIndex].url}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <CurrentScreen />
              </motion.div>
            </AnimatePresence>
          </Browser>
        </div>

        {/* Right arrow */}
        <button
          onClick={goToNext}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted/50 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:h-12 md:w-12"
          aria-label="Next screen"
        >
          <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex gap-2">
        {screens.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={cn(
              "h-2.5 w-2.5 rounded-full transition-colors",
              i === currentIndex ? "bg-accent" : "bg-muted hover:bg-muted-foreground/30"
            )}
            aria-label={`Go to screen ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// Main export - responsive: mobile carousel on small screens, full carousel on desktop
export function BrowserCarousel() {
  return (
    <>
      {/* Mobile: Simplified mobile-optimized carousel */}
      <div className="md:hidden">
        <BrowserMobileCarousel screenList={mobileScreens} variant="simplified" />
      </div>

      {/* Desktop: Full interactive carousel */}
      <div className="hidden md:block">
        <BrowserInteractiveCarousel />
      </div>
    </>
  );
}
