import { Mail, Github, Linkedin, MapPin } from 'lucide-react'
import SectionHeader from "../ui/SectionHeader"
import MagneticButton from "../ui/MagneticButton"
import { PortfolioData } from '@/types/portfolio'

interface ContactProps {
  data: PortfolioData
}

export default function Contact({ data }: ContactProps) {
  const email = data?.personal?.email || "bruceiiiblake@gmail.com"

  return (
    <section
      id="contact"
      className="py-20 lg:py-32 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-950"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Let's Work Together"
          subtitle="Ready to bring your ideas to life? Let's connect and create something amazing."
        />

        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-neutral-800 rounded-3xl p-8 lg:p-12 shadow-2xl border border-neutral-200/50 dark:border-neutral-700/50">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Get In Touch</h3>

                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-500/10 rounded-xl">
                      <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">Email</p>
                      <a
                        href={`mailto:${email}`}
                        className="text-lg font-medium text-neutral-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                      >
                        {email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-purple-500/10 rounded-xl">
                      <MapPin className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">Location</p>
                      <p className="text-lg font-medium text-neutral-900 dark:text-white">Available for Remote Work</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">Follow me on social media</p>
                  <div className="flex space-x-4">
                    <a
                      href="https://github.com/bruceblake"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-neutral-100 dark:bg-neutral-700 rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors duration-200"
                      aria-label="GitHub"
                    >
                      <Github className="w-6 h-6 text-neutral-700 dark:text-neutral-300" />
                    </a>
                    <a
                      href="https://linkedin.com/in/bruceblake"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-neutral-100 dark:bg-neutral-700 rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors duration-200"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-6 h-6 text-neutral-700 dark:text-neutral-300" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <div className="text-center lg:text-left">
                  <h4 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">Ready to start a project?</h4>
                  <p className="text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
                    I'm always interested in new opportunities and exciting projects. Whether you have a question or
                    just want to say hi, I'll do my best to get back to you!
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <MagneticButton
                      href={`mailto:${email}`}
                      className="inline-flex items-center justify-center px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25"
                    >
                      <Mail className="w-5 h-5 mr-2" />
                      Send Email
                    </MagneticButton>

                    <MagneticButton
                      href="/Bruce_Blake_Resume.pdf"
                      className="inline-flex items-center justify-center px-8 py-4 bg-white dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 font-medium rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-600 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    >
                      View Resume
                    </MagneticButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}