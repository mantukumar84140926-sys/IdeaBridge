import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const tools = [
  { slug:"word-counter", name:"Word Counter", description:"Count words, characters, sentences and estimated reading time in text.", category:"Text", example:"Paste an article, essay, email or social post to see its length at a glance.", steps:["Paste or type your text into the input area.","Review word, character and sentence counts.","Edit your text and watch the totals update."] },
  { slug:"case-converter", name:"Case Converter", description:"Change text to uppercase, lowercase, title case or sentence case.", category:"Text", example:"Convert headings, captions and copied text into a consistent writing style.", steps:["Paste the text you want to change.","Choose the output case.","Copy the converted text."] },
  { slug:"remove-line-breaks", name:"Remove Line Breaks", description:"Clean copied text by replacing unwanted line breaks with spaces.", category:"Text", example:"Useful when text copied from PDFs or narrow columns contains broken lines.", steps:["Paste the text with unwanted line breaks.","The tool joins the lines and tidies repeated spaces.","Copy the cleaned result."] },
  { slug:"json-formatter", name:"JSON Formatter", description:"Format and validate JSON with readable indentation in your browser.", category:"Developer", example:"Paste a compact or hard-to-read JSON object to inspect its structure.", steps:["Paste valid JSON into the editor.","Review the formatted output or the validation error.","Copy the readable JSON."] },
  { slug:"base64-encoder", name:"Base64 Encoder", description:"Encode plain text to Base64 or decode Base64 text locally.", category:"Developer", example:"Convert small text snippets for development and debugging workflows.", steps:["Paste text or a Base64 string.","Select Encode or Decode.","Copy the converted result."] },
  { slug:"url-encoder", name:"URL Encoder", description:"Encode or decode URL components so reserved characters are handled safely.", category:"Developer", example:"Prepare query parameter values containing spaces or punctuation.", steps:["Paste the URL component.","Choose Encode or Decode.","Copy the resulting component."] },
  { slug:"percentage-calculator", name:"Percentage Calculator", description:"Calculate a percentage of a value using a simple two-number input.", category:"Calculator", example:"Enter 15, 240 to calculate 15 percent of 240.", steps:["Enter the percentage, followed by a comma and the total.","Read the calculated amount.","Change either number to recalculate."] },
  { slug:"bmi-calculator", name:"BMI Calculator", description:"Estimate adult body mass index from height in centimetres and weight in kilograms.", category:"Calculator", example:"Enter 170, 65 for a screening estimate. This is not a diagnosis.", steps:["Enter height in centimetres, then weight in kilograms.","Review the BMI estimate and broad adult range.","Use the result as general information, not medical advice."] },
  { slug:"password-generator", name:"Password Generator", description:"Generate a random password locally using your browser's cryptographic random source.", category:"Security", example:"Generate a password between 8 and 64 characters without sending it to a server.", steps:["Enter a desired length from 8 to 64.","Generate a password using the tool.","Copy it and store it in a trusted password manager."] },
  { slug:"text-reverser", name:"Text Reverser", description:"Reverse the order of characters in a text string instantly.", category:"Text", example:"Reverse a short phrase, string or sequence for a quick text transformation.", steps:["Paste the text you want to reverse.","Review the characters in reverse order.","Copy the result."] },
  { slug:"remove-duplicate-lines", name:"Remove Duplicate Lines", description:"Remove repeated lines while preserving the first occurrence and original order.", category:"Text", example:"Clean repeated names, entries or copied lists without sorting the remaining lines.", steps:["Paste your multi-line list.","Duplicate lines are removed automatically.","Copy the unique list."] },
  { slug:"sort-lines", name:"Sort Lines", description:"Sort a multi-line list alphabetically, without regard to letter case.", category:"Text", example:"Arrange names, keywords or short lists in alphabetical order.", steps:["Paste one item per line.","Review the alphabetically sorted lines.","Copy the sorted list."] },
  { slug:"url-slug-generator", name:"URL Slug Generator", description:"Turn a title into a lowercase, hyphen-separated URL slug.", category:"Text", example:"Convert a page title into a readable URL path segment.", steps:["Paste a page or article title.","Review the normalized slug.","Copy it into your content workflow."] },
  { slug:"html-entity-encoder", name:"HTML Entity Encoder", description:"Escape ampersands, angle brackets, quotes and apostrophes in text.", category:"Developer", example:"Prepare text for safe display in an HTML context; always use context-appropriate output encoding.", steps:["Paste the text containing HTML-sensitive characters.","Review the escaped entities.","Copy the encoded text."] },
  { slug:"binary-text-converter", name:"Binary Text Converter", description:"Convert text to binary bytes or decode groups of binary digits back to text.", category:"Developer", example:"Encode the word Hi into binary or decode a space-separated binary sequence.", steps:["Paste text or space-separated binary groups.","Choose Encode or Decode.","Copy the converted result."] },
  { slug:"hex-text-converter", name:"Hex Text Converter", description:"Convert text to hexadecimal bytes or decode hexadecimal pairs into text.", category:"Developer", example:"Inspect a text string as hexadecimal byte values.", steps:["Paste text or hexadecimal byte pairs.","Choose Encode or Decode.","Copy the converted result."] },
  { slug:"average-calculator", name:"Average Calculator", description:"Calculate the arithmetic mean of a list of numbers.", category:"Calculator", example:"Enter 10, 20, 30 to calculate an average of 20.", steps:["Enter numbers separated by commas or spaces.","Review the arithmetic mean.","Add or remove values to recalculate."] },
  { slug:"discount-calculator", name:"Discount Calculator", description:"Calculate a discounted sale price and the amount saved.", category:"Calculator", example:"Enter 1200, 20 to calculate a 20 percent discount on 1200.", steps:["Enter the original price and discount percentage.","Review the sale price and savings.","Check the currency and tax rules separately."] },
  { slug:"tip-calculator", name:"Tip Calculator", description:"Calculate a tip amount and total bill from a bill value and tip percentage.", category:"Calculator", example:"Enter 850, 10 to calculate a 10 percent tip on 850.", steps:["Enter the bill amount and tip percentage.","Review the tip and total.","Adjust the percentage to compare amounts."] },
  { slug:"loan-payment-calculator", name:"Loan Payment Calculator", description:"Estimate monthly loan payments, total repayment and interest from principal, annual rate and term.", category:"Calculator", example:"Enter 500000, 9, 5 for a 500,000 loan at 9 percent for five years.", steps:["Enter principal, annual interest rate and term in years.","Review estimated monthly payment and total interest.","Compare with your lender's official repayment schedule."] },
  { slug:"random-number-generator", name:"Random Number Generator", description:"Generate a random whole number within an inclusive minimum and maximum range.", category:"Calculator", example:"Enter 1, 100 to generate a whole number from 1 through 100.", steps:["Enter the minimum and maximum whole numbers.","Generate a value within that inclusive range.","Generate again whenever you need another value."] },
  { slug:"age-calculator", name:"Age Calculator", description:"Calculate elapsed age in years, months and days from a birth date.", category:"Calculator", example:"Enter a birth date in YYYY-MM-DD format.", steps:["Enter your date of birth using YYYY-MM-DD.","Review the age calculated as of today.","Check the date format if the input is rejected."] },
  { slug:"date-difference-calculator", name:"Date Difference Calculator", description:"Count the number of calendar days between two dates.", category:"Calculator", example:"Enter 2026-01-01, 2026-01-31 to calculate the elapsed days.", steps:["Enter the first date in YYYY-MM-DD format.","Enter the second date after a comma.","Review the absolute difference in days."] },
] as const;

type Tool = (typeof tools)[number];

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = tools.find((item) => item.slug === slug);
  if (!tool) return { title: "Tool not found | Utilora" };
  return {
    title: tool.name + " — Free Online Tool",
    description: tool.description + " Free to use in your browser with no sign-up.",
    alternates: { canonical: "/tools/" + tool.slug },
    openGraph: { title: tool.name + " | Utilora", description: tool.description, type: "website" },
  };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = tools.find((item) => item.slug === slug);
  if (!tool) notFound();

  const siteUrl = "https://utilora-ten.vercel.app";
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.name,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    isAccessibleForFree: true,
    description: tool.description,
    url: siteUrl + "/tools/" + tool.slug,
  };

  return (
    <main className="shell max-w-3xl py-14 md:py-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Link href="/" className="text-sm font-semibold text-green-700 hover:underline">← Back to Utilora</Link>
      <div className="mt-9 text-xs font-bold uppercase tracking-[.16em] text-green-700">{tool.category} tool · Free online utility</div>
      <h1 className="font-display mt-3 text-4xl font-bold tracking-tight md:text-5xl">{tool.name}</h1>
      <p className="mt-5 text-lg leading-8 text-slate-600">{tool.description}</p>
      <div className="mt-8 rounded-2xl border border-green-100 bg-green-50 p-6">
        <h2 className="font-display text-xl font-bold">Open the {tool.name.toLowerCase()}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">This utility runs in your browser. Open the interactive tool on Utilora to enter your values and copy the result.</p>
        <Link href={"/?tool=" + tool.slug + "#toolbox"} className="primary mt-5 inline-flex items-center">Use this free tool <span aria-hidden="true" className="ml-2">→</span></Link>
      </div>
      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold">How to use this tool</h2>
        <ol className="mt-5 list-decimal space-y-3 pl-6 leading-7 text-slate-600">
          {tool.steps.map((step) => <li key={step}>{step}</li>)}
        </ol>
      </section>
      <section className="mt-10 rounded-2xl border border-slate-200 p-6">
        <h2 className="font-display text-xl font-bold">Example</h2>
        <p className="mt-3 leading-7 text-slate-600">{tool.example}</p>
      </section>
      <section className="mt-10">
        <h2 className="font-display text-2xl font-bold">Frequently asked questions</h2>
        <h3 className="mt-6 font-bold">Is the {tool.name.toLowerCase()} free?</h3>
        <p className="mt-2 leading-7 text-slate-600">Yes. Utilora provides this tool free to use and does not require an account.</p>
        <h3 className="mt-6 font-bold">Do I need to install anything?</h3>
        <p className="mt-2 leading-7 text-slate-600">No installation is required. Use a modern web browser on a phone, tablet or computer.</p>
        <h3 className="mt-6 font-bold">Is my input uploaded?</h3>
        <p className="mt-2 leading-7 text-slate-600">The current interactive utility is designed to process its input in your browser. Avoid entering sensitive information into any online tool.</p>
      </section>
      <p className="mt-12 border-t border-slate-200 pt-6 text-sm leading-6 text-slate-500">Utilora tools are provided for general productivity and informational use. Verify important outputs independently.</p>
    </main>
  );
}
