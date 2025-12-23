import Link from "next/link";

function Contact() {
  return (
    <section
      id="contact"
      className="max-w-6xl mx-auto bg-white rounded-lg p-6 shadow mb-8"
    >
      <div className="md:flex md:items-start gap-6">
        <div className="md:w-1/2">
          <h2 className="text-2xl font-bold mb-2">Contact Me</h2>
          <p className="text-slate-600 mb-4">
            Have a question or need help finding a doctor? Send me a message and
            I will get back to you as soon as possible.
          </p>

          <div className="space-y-3 text-sm text-slate-700">
            <div className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-indigo-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v9a2 2 0 002 2z"
                />
              </svg>
              <div>
                <div className="font-semibold">Email</div>
                <Link
                  href="mailto:m.megahed168@gmail.com"
                  className="text-indigo-600"
                >
                  m.megahed168@gmail.com
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-indigo-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5h2l2 7 4-2 4 6 2-8 2-3H3z"
                />
              </svg>
              <div>
                <div className="font-semibold">Phone</div>
                <Link href="tel:+201153039862" className="text-indigo-600">
                  +201153039862
                </Link>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-indigo-500 mt-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-3-3h-2M7 20H2v-2a3 3 0 013-3h2m10 5v-6a4 4 0 00-4-4h-4a4 4 0 00-4 4v6"
                />
              </svg>
              <div>
                <div className="font-semibold">Address</div>
                <div className="text-slate-500">Komombo, Aswan, Egypt</div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-sm text-slate-500">
            I aim to reply within 24 hours.
          </div>
        </div>

        <div className="mt-6 md:mt-0 md:w-1/2 bg-slate-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2"> Mohamed Megahed</h3>
          <div className="text-sm text-slate-600 mb-4">Founder — Aswan-Med</div>
          <p className="text-slate-700 mb-4">
            Thanks for visiting Aswan-Med — my goal is to make healthcare access
            simple and friendly. If you need help, contact me and I will assist
            you personally.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Contact;
