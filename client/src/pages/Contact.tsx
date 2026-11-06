import { useForm } from "react-hook-form";

interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const { register, handleSubmit } = useForm<ContactFormValues>({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (_values: ContactFormValues) => {};

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-4 py-16 transition-colors duration-300">
      <div className="max-w-5xl w-full space-y-12">
        {/* Section Header */}
        <header className="text-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Contact Us
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Get in touch with our team
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start pt-4">
          <div className="space-y-8 pr-0 md:pr-8">
            <div className="flex items-start gap-4 group">
              <div className="w-10 h-10 rounded-full border border-border/80 flex items-center justify-center text-muted-foreground bg-card/30 group-hover:text-foreground transition-colors duration-200 shrink-0">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-sm tracking-wide text-foreground">
                  Email
                </h4>
                <p className="text-muted-foreground text-sm font-light mt-0.5">
                  hello@shopmate.com
                </p>
              </div>
            </div>

            {/* Phone Info */}
            <div className="flex items-start gap-4 group">
              <div className="w-10 h-10 rounded-full border border-border/80 flex items-center justify-center text-muted-foreground bg-card/30 group-hover:text-foreground transition-colors duration-200 shrink-0">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.62214C2.25 5.22915 3.37915 4.1 4.77214 4.1H6.70296C7.54519 4.1 8.27116 4.65481 8.49075 5.46743L9.29744 8.4552C9.52988 9.31571 9.0768 10.2223 8.24355 10.5556L7.26257 10.948C7.90226 12.3023 9.00684 13.4069 10.3612 14.0466L10.7536 13.0656C11.0868 12.2323 11.9935 11.7793 12.854 12.0117L15.8418 12.8184C16.6544 13.038 17.2092 13.764 17.2092 14.6062V16.537C17.2092 17.93 16.0801 19.0592 14.6871 19.0592C7.8185 19.0592 2.25 13.4907 2.25 6.62214Z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-sm tracking-wide text-foreground">
                  Phone
                </h4>
                <p className="text-muted-foreground text-sm font-light mt-0.5">
                  +1 (555) 123-4567
                </p>
              </div>
            </div>

            {/* Address Info */}
            <div className="flex items-start gap-4 group">
              <div className="w-10 h-10 rounded-full border border-border/80 flex items-center justify-center text-muted-foreground bg-card/30 group-hover:text-foreground transition-colors duration-200 shrink-0">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-sm tracking-wide text-foreground">
                  Address
                </h4>
                <p className="text-muted-foreground text-sm font-light mt-0.5">
                  123 Shop Street, City, ST 12345
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card/50 border border-border/80 rounded-xl p-6 md:p-8 shadow-md">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <input
                    type="text"
                    {...register("name", { required: true })}
                    placeholder="Your Name"
                    required
                    className="w-full bg-background border border-input rounded-md px-4 py-3 text-sm placeholder:text-muted-foreground/60 text-foreground focus:outline-none focus:ring-1 focus:ring-ring transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    placeholder="Your Email"
                    required
                    className="w-full bg-background border border-input rounded-md px-4 py-3 text-sm placeholder:text-muted-foreground/60 text-foreground focus:outline-none focus:ring-1 focus:ring-ring transition-all"
                  />
                </div>
              </div>

              {/* Subject Input Row */}
              <div className="space-y-1">
                <input
                  type="text"
                  {...register("subject", { required: true })}
                  placeholder="Subject"
                  required
                  className="w-full bg-background border border-input rounded-md px-4 py-3 text-sm placeholder:text-muted-foreground/60 text-foreground focus:outline-none focus:ring-1 focus:ring-ring transition-all"
                />
              </div>

              {/* Message Box Row */}
              <div className="space-y-1">
                <textarea
                  {...register("message", { required: true })}
                  placeholder="Your Message"
                  rows={5}
                  required
                  className="w-full bg-background border border-input rounded-md px-4 py-3 text-sm placeholder:text-muted-foreground/60 text-foreground focus:outline-none focus:ring-1 focus:ring-ring resize-none transition-all"
                />
              </div>

              {/* Submit Action Button */}
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground font-medium py-3 rounded-md text-sm transition-all duration-200 hover:opacity-90 flex items-center justify-center gap-2 mt-2 cursor-pointer shadow"
              >
                <svg
                  className="w-4 h-4 transform rotate-[-15deg] stroke-[2px]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
