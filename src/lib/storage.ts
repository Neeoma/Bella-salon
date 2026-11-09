import { promises as fs } from "fs";
import path from "path";

export interface BookingRecord {
  id: string;
  reference: string;
  serviceId: string;
  serviceName: string;
  category: string;
  price: number;
  durationMinutes: number;
  stylistId: string;
  stylistName: string;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "11:00 AM"
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes: string;
  status: "confirmed" | "cancelled";
  createdAt: string;
}

export interface InquiryRecord {
  id: string;
  ticketCode: string;
  name: string;
  email: string;
  phone: string;
  inquiryType: string;
  message: string;
  createdAt: string;
}

export interface NewsletterRecord {
  email: string;
  subscribedAt: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const BOOKINGS_FILE = path.join(DATA_DIR, "bookings.json");
const INQUIRIES_FILE = path.join(DATA_DIR, "inquiries.json");
const NEWSLETTER_FILE = path.join(DATA_DIR, "newsletter.json");

function getSeedDate(daysAhead: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  if (d.getDay() === 1) {
    d.setDate(d.getDate() + 1);
  }
  return d.toISOString().slice(0, 10);
}

const SEED_BOOKINGS: BookingRecord[] = [
  {
    id: "seed-1",
    reference: "BL-2481",
    serviceId: "hair-frontal-install",
    serviceName: "Luxury Raw Hair Wig Install & HD Frontal Melt",
    category: "Hair",
    price: 95000,
    durationMinutes: 120,
    stylistId: "toluwani-adeyemi",
    stylistName: "Toluwani Adeyemi",
    date: getSeedDate(1),
    time: "11:00 AM",
    customerName: "Tiwa Adesanya",
    customerEmail: "tiwa.demo@example.ng",
    customerPhone: "+234 809 555 0142",
    notes: "Soft body-wave layers, warm espresso tone.",
    status: "confirmed",
    createdAt: "2026-11-08T10:00:00.000Z",
  },
  {
    id: "seed-2",
    reference: "BL-3910",
    serviceId: "skin-gold-leaf",
    serviceName: "24K Gold Leaf Cellular Anti-Aging Facial",
    category: "Skin",
    price: 150000,
    durationMinutes: 90,
    stylistId: "funke-adesina",
    stylistName: "Dr. Funke Adesina",
    date: getSeedDate(2),
    time: "02:00 PM",
    customerName: "Ngozi Okafor",
    customerEmail: "ngozi.demo@example.ng",
    customerPhone: "+234 803 555 0199",
    notes: "Pre-owambe luminous facial prep.",
    status: "confirmed",
    createdAt: "2026-11-08T12:15:00.000Z",
  },
];

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readJsonFile<T>(filePath: string, fallback: T): Promise<T> {
  await ensureDataDir();
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    await fs.writeFile(filePath, JSON.stringify(fallback, null, 2), "utf-8");
    return fallback;
  }
}

async function writeJsonFile<T>(filePath: string, data: T): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export async function getBookings(): Promise<BookingRecord[]> {
  return readJsonFile<BookingRecord[]>(BOOKINGS_FILE, SEED_BOOKINGS);
}

export async function saveBookings(bookings: BookingRecord[]): Promise<void> {
  return writeJsonFile(BOOKINGS_FILE, bookings);
}

export async function getInquiries(): Promise<InquiryRecord[]> {
  return readJsonFile<InquiryRecord[]>(INQUIRIES_FILE, []);
}

export async function saveInquiries(inquiries: InquiryRecord[]): Promise<void> {
  return writeJsonFile(INQUIRIES_FILE, inquiries);
}

export async function getNewsletterSubscribers(): Promise<NewsletterRecord[]> {
  return readJsonFile<NewsletterRecord[]>(NEWSLETTER_FILE, []);
}

export async function saveNewsletterSubscribers(
  subscribers: NewsletterRecord[]
): Promise<void> {
  return writeJsonFile(NEWSLETTER_FILE, subscribers);
}
