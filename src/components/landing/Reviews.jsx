"use client"
import { motion } from "framer-motion"
import { Star, MessageSquare } from "lucide-react"

const reviews = [
  {
    name: "Alex Rivera",
    role: "Ops Manager @ Vercel",
    text: "The AI classification accuracy is mind-blowing. It cut our support response time by 60% in the first week.",
    avatar: "AR"
  },
  {
    name: "Sarah Chen",
    role: "Product Lead @ Linear",
    text: "NexaFlow is exactly what we needed to scale our booking infrastructure without hiring more support agents.",
    avatar: "SC"
  },
  {
    name: "James Wilson",
    role: "Founder @ District",
    text: "Enterprise-grade UI with powerful automation. The webhooks are robust and the developer experience is top-notch.",
    avatar: "JW"
  }
]

export function Reviews() {
  return (
    <section id="reviews" className="py-24 relative">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-white mb-16">Loved by Innovative Teams</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 rounded-[2rem] border border-white/5 text-left relative group overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 text-white/5 group-hover:text-[#7C3AED]/10 transition-colors">
                <MessageSquare className="w-24 h-24" />
              </div>
              
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-[#7C3AED] text-[#7C3AED]" />
                ))}
              </div>
              
              <p className="text-slate-300 mb-8 relative z-10 leading-relaxed italic">
                "{review.text}"
              </p>
              
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#EC4899] flex items-center justify-center text-white font-bold">
                  {review.avatar}
                </div>
                <div>
                  <div className="text-white font-bold text-sm">{review.name}</div>
                  <div className="text-slate-500 text-xs">{review.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
