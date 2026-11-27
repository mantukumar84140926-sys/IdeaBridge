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
  { slug:"line-counter", name:"Line Counter", description:"Count total lines and non-empty lines in a text block.", category:"Text", example:"Paste a multi-line note or list to see its total and non-empty line counts.", steps:["Paste your multi-line text.","Review total and non-empty line counts.","Edit the text to update the counts."] },
  { slug:"word-frequency-counter", name:"Word Frequency Counter", description:"Count repeated words and sort the most frequent terms to the top.", category:"Text", example:"Paste a paragraph to see the most common words in it.", steps:["Paste the text to analyze.","Review the frequency list, sorted by count.","Use the results to spot repeated wording."] },
  { slug:"whitespace-cleaner", name:"Whitespace Cleaner", description:"Trim each line and normalize repeated spaces and tabs.", category:"Text", example:"Clean pasted text that contains uneven spacing or indentation.", steps:["Paste text with inconsistent spacing.","Review the normalized lines.","Copy the cleaned text."] },
  { slug:"json-minifier", name:"JSON Minifier", description:"Validate JSON and remove unnecessary whitespace to create compact output.", category:"Developer", example:"Paste formatted JSON to produce a compact single-line representation.", steps:["Paste valid JSON.","Review the compact output or validation error.","Copy the minified JSON."] },
  { slug:"html-entity-decoder", name:"HTML Entity Decoder", description:"Decode HTML character entities into readable text in your browser.", category:"Developer", example:"Decode strings such as &amp; and &lt; into their corresponding characters.", steps:["Paste text containing HTML entities.","Review the decoded text.","Copy the readable result."] },
  { slug:"xml-validator", name:"XML Validator", description:"Check whether an XML document is well-formed using your browser's XML parser.", category:"Developer", example:"Paste an XML snippet to check for mismatched tags and parsing errors.", steps:["Paste the XML document.","Review whether the document is well-formed.","Correct any reported parsing errors and check again."] },
  { slug:"simple-interest-calculator", name:"Simple Interest Calculator", description:"Calculate simple interest and the total amount from principal, rate and time.", category:"Calculator", example:"Enter 10000, 8, 2 to calculate simple interest on 10,000 at 8 percent for two years.", steps:["Enter principal, annual interest rate and years.","Review the interest and total amount.","Compare with the terms of your actual agreement."] },
  { slug:"compound-interest-calculator", name:"Compound Interest Calculator", description:"Estimate compound growth using principal, annual rate, years and compounding frequency.", category:"Calculator", example:"Enter 10000, 8, 5, 12 for monthly compounding over five years.", steps:["Enter principal, annual interest rate, years and compounding frequency.","Review the estimated final amount and interest earned.","Treat the result as an estimate, not a guaranteed return."] },
  { slug:"sales-tax-calculator", name:"Sales Tax Calculator", description:"Calculate a sales tax amount and final price including tax.", category:"Calculator", example:"Enter 999, 18 to calculate 18 percent tax on 999.", steps:["Enter the pre-tax price and tax percentage.","Review the tax amount and total.","Check local tax rules for the actual transaction."] },
  { slug:"uuid-generator", name:"UUID Generator", description:"Generate a random version 4 UUID using your browser's cryptographic API.", category:"Security", example:"Create a unique identifier for development, testing or sample data.", steps:["Open the UUID Generator.","A random UUID is generated in your browser.","Copy the identifier for your development task."] },
  { slug:"sentence-counter", name:"Sentence Counter", description:"Count sentences in text using common sentence-ending punctuation.", category:"Text", example:"Paste an article or note to estimate how many sentences it contains.", steps:["Paste your text into the tool.","Review the estimated sentence count.","Check unusual abbreviations and punctuation manually when precision matters."] },
  { slug:"paragraph-counter", name:"Paragraph Counter", description:"Count paragraphs separated by blank lines in a text block.", category:"Text", example:"Paste an essay or document excerpt to count its paragraphs.", steps:["Paste the text with paragraph breaks.","Review the number of non-empty paragraphs.","Use blank lines to separate paragraphs clearly."] },
  { slug:"duplicate-word-remover", name:"Duplicate Word Remover", description:"Remove repeated words while keeping the first occurrence of each word.", category:"Text", example:"Clean repeated words in a short note or copied passage.", steps:["Paste the text to clean.","Review the text with repeated words removed.","Check the result to ensure the wording still reads naturally."] },
  { slug:"character-frequency-counter", name:"Character Frequency Counter", description:"Count non-whitespace characters and show the frequency of each character.", category:"Text", example:"Paste a short string to inspect which characters appear most often.", steps:["Paste the text to analyze.","Review the character frequency table.","Use the counts for simple text analysis."] },
  { slug:"rgb-to-hex-converter", name:"RGB to HEX Converter", description:"Convert RGB color channel values from 0 to 255 into a six-digit HEX color code.", category:"Developer", example:"Enter 255, 0, 128 to convert an RGB color to HEX.", steps:["Enter red, green and blue values separated by commas.","Keep each channel between 0 and 255.","Copy the resulting HEX color code."] },
  { slug:"hex-to-rgb-converter", name:"HEX to RGB Converter", description:"Convert a six-digit HEX color code into red, green and blue channel values.", category:"Developer", example:"Enter #FF0080 to get its RGB channel values.", steps:["Enter a six-digit HEX color, with or without #.","Review the red, green and blue values.","Copy the RGB values into your design or code."] },
  { slug:"temperature-converter", name:"Temperature Converter", description:"Convert a temperature from Celsius to Fahrenheit or Fahrenheit to Celsius.", category:"Calculator", example:"Enter 25, C to convert 25 degrees Celsius to Fahrenheit.", steps:["Enter the temperature value and C or F.","Review the converted temperature.","Use the correct source unit for the value you entered."] },
  { slug:"unix-timestamp-converter", name:"Unix Timestamp Converter", description:"Convert a Unix timestamp in seconds into a UTC ISO date and time.", category:"Developer", example:"Enter a Unix timestamp in seconds to inspect its UTC date.", steps:["Paste a Unix timestamp measured in seconds.","Review the UTC date and time.","If your source is milliseconds, divide it by 1,000 first."] },
  { slug:"time-duration-calculator", name:"Time Duration Calculator", description:"Calculate elapsed time between two 24-hour clock times, including overnight periods.", category:"Calculator", example:"Enter 09:30, 17:15 to calculate seven hours and 45 minutes.", steps:["Enter a start time in HH:MM format.","Enter an end time after a comma.","Review the elapsed hours and minutes."] },
  { slug:"percentage-change-calculator", name:"Percentage Change Calculator", description:"Calculate percentage increase or decrease between an original value and a new value.", category:"Calculator", example:"Enter 80, 100 to calculate a 25 percent increase.", steps:["Enter the original value and the new value.","Review the percentage change.","A zero original value cannot be used as the percentage baseline."] },
  { slug:"ratio-simplifier", name:"Ratio Simplifier", description:"Reduce a ratio of two positive whole numbers to its simplest form.", category:"Calculator", example:"Enter 24, 36 to simplify the ratio to 2:3.", steps:["Enter two positive whole numbers separated by a comma.","Review the simplified ratio.","Use the result to compare proportional quantities."] },
  { slug:"color-contrast-checker", name:"Color Contrast Checker", description:"Calculate the WCAG contrast ratio between two six-digit HEX colors and check AA text thresholds.", category:"Developer", example:"Enter #FFFFFF, #000000 to check the contrast between white and black.", steps:["Enter the foreground and background HEX colors.","Review the contrast ratio and AA checks.","Use the result to improve text readability and accessibility."] },
  { slug:"random-list-picker", name:"Random List Picker", description:"Choose one random entry from a list of options, one per line.", category:"Text", example:"Paste names, tasks or choices on separate lines and pick one at random.", steps:["Enter one option on each line.","Review the randomly selected item.","Run it again to make another selection."] },
  { slug:"date-add-or-subtract-calculator", name:"Date Add or Subtract Calculator", description:"Add or subtract a whole number of days from a date.", category:"Calculator", example:"Enter 2026-11-27, 30 to calculate the date 30 days later.", steps:["Enter a date in YYYY-MM-DD format.","Enter a positive or negative number of days after a comma.","Review the resulting calendar date."] },
  { slug:"weekday-finder", name:"Weekday Finder", description:"Find the weekday name for a calendar date.", category:"Calculator", example:"Enter a date such as 2026-11-27 to see its weekday.", steps:["Enter a date in YYYY-MM-DD format.","Review the weekday name.","Check the date format if the input is rejected."] },
  { slug:"days-in-month-calculator", name:"Days in Month Calculator", description:"Find the number of days in a month, including leap-year February.", category:"Calculator", example:"Enter 2026-02 to find the number of days in February 2026.", steps:["Enter a year and month in YYYY-MM format.","Review the number of days in that month.","Change the year to compare leap-year February."] },
  { slug:"number-base-converter", name:"Number Base Converter", description:"Convert integer values between bases 2 and 36, including binary, decimal and hexadecimal.", category:"Developer", example:"Enter FF, 16, 2 to convert hexadecimal FF into binary.", steps:["Enter the number to convert.","Enter its source base and target base, separated by commas.","Copy the converted integer."] },
  { slug:"gcd-and-lcm-calculator", name:"GCD and LCM Calculator", description:"Find the greatest common divisor and least common multiple of two whole numbers using exact integer arithmetic.", category:"Calculator", example:"Enter 24, 36 to get GCD 12 and LCM 72.", steps:["Enter two whole numbers separated by a comma.","Review the greatest common divisor and least common multiple.","Use negative inputs if needed; their absolute values are used."] },
  { slug:"prime-number-checker", name:"Prime Number Checker", description:"Check whether an integer is prime using trial division, with a clear limit for very large values.", category:"Calculator", example:"Enter 97 to check whether it is prime.", steps:["Enter a non-negative whole number.","Review the primality result or a factor when one is found.","For very large values, note the tool's stated trial-division limit."] },
  { slug:"factorial-calculator", name:"Factorial Calculator", description:"Calculate exact factorials with BigInt arithmetic for whole numbers from 0 to 5000.", category:"Calculator", example:"Enter 10 to calculate 10! = 3628800.", steps:["Enter a non-negative whole number from 0 to 5000.","Select or enter the value in the tool.","Copy the exact integer result."] },
  { slug:"roman-numeral-converter", name:"Roman Numeral Converter", description:"Convert whole numbers from 1 through 3999 into standard Roman numeral notation.", category:"Calculator", example:"Enter 2026 to get MMXXVI.", steps:["Enter a whole number from 1 to 3999.","Review its Roman numeral representation.","Use the standard subtractive notation shown in the result."] },
  { slug:"csv-to-json-converter", name:"CSV to JSON Converter", description:"Convert CSV rows into a JSON array of objects, supporting quoted cells and escaped quotes.", category:"Developer", example:"Paste a header row such as name,age followed by Alice,30.", steps:["Paste CSV data with column headers in the first row.","Keep commas inside quoted values and double embedded quotes.","Review the formatted JSON array and copy it."] },
  { slug:"json-to-csv-converter", name:"JSON to CSV Converter", description:"Convert a JSON array of objects into CSV, escaping commas, quotes and line breaks.", category:"Developer", example:'Enter [{"name":"Alice","age":30},{"name":"Bob","age":25}].', steps:["Paste a non-empty JSON array containing objects.","Review the CSV header and rows.","Copy the CSV output into a spreadsheet or data tool."] },
  { slug:"url-query-parser", name:"URL Query Parser", description:"Parse a full URL and inspect its origin, path and decoded query parameter values.", category:"Developer", example:"Enter https://example.com/search?q=hello&page=2.", steps:["Paste a complete URL including its scheme.","Review the origin, path and query parameters.","Repeated query keys appear as separate entries."] },
  { slug:"regex-tester", name:"Regex Tester", description:"Test a JavaScript regular expression against sample text and inspect matching strings and capture groups.", category:"Developer", example:"First line: /cat/gi. Next lines: Cat and catalog.", steps:["Enter a regular expression on the first line, such as /cat/gi.","Paste sample text on the lines below.","Review up to 100 matches, their positions and capture groups."] },
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

  const related = tools.filter((item) => item.category === tool.category && item.slug !== tool.slug).slice(0, 4);
  const siteUrl = "https://utilora-ten.vercel.app";
  const schema = [{
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.name,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    isAccessibleForFree: true,
    description: tool.description,
    url: siteUrl + "/tools/" + tool.slug,
  }, {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "Is " + tool.name + " free?", acceptedAnswer: { "@type": "Answer", text: "Yes. Utilora provides this tool free to use and does not require an account." } },
      { "@type": "Question", name: "Do I need to install anything?", acceptedAnswer: { "@type": "Answer", text: "No installation is required. Use a modern web browser on a phone, tablet or computer." } },
      { "@type": "Question", name: "Is my input uploaded?", acceptedAnswer: { "@type": "Answer", text: "The current interactive utility is designed to process its input in your browser. Avoid entering sensitive information into any online tool." } },
    ],
  }];

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
      {related.length > 0 && <section className="mt-12 border-t border-slate-200 pt-8"><h2 className="font-display text-2xl font-bold">Related free tools</h2><ul className="mt-4 grid gap-3 sm:grid-cols-2">{related.map((item) => <li key={item.slug}><Link className="text-green-700 font-semibold hover:underline" href={"/tools/" + item.slug}>{item.name} →</Link><p className="mt-1 text-sm text-slate-500">{item.description}</p></li>)}</ul></section>}
      <p className="mt-12 border-t border-slate-200 pt-6 text-sm leading-6 text-slate-500">Utilora tools are provided for general productivity and informational use. Verify important outputs independently.</p>
    </main>
  );
}
