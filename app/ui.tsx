"use client";

import { FormEvent, useId, useState } from "react";
import { SiteFooter } from "../components/layout/SiteFooter";
import { SiteHeader } from "../components/layout/SiteHeader";
import { Button } from "../components/ui/Button";
import { Dialog } from "../components/ui/Dialog";
import { Field, FieldError, FieldHint, FieldLabel, Input, Select } from "../components/ui/Form";

export { SiteFooter, SiteHeader };

export function PageIntro({ kicker, title, italic, description }: { kicker: string; title: string; italic?: string; description: string }) {
  return <section className="page-intro"><div className="shell"><div className="section-kicker light">{kicker}</div><h1>{title}<br/>{italic && <em>{italic}</em>}</h1><p>{description}</p></div></section>;
}

export function InterestModal({ onClose }: { onClose: () => void }) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const prefix = useId();
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const response = await fetch("/api/leads", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(data) });
    setStatus(response.ok ? "done" : "error");
  }
  return <Dialog open onClose={onClose} title={status === "done" ? "Terima kasih." : "Mari mulai dari sini."} description={status === "done" ? "Minat Anda sudah tercatat. Tim SPMB akan menghubungi dengan cara yang nyaman untuk Anda." : "Isi singkat agar tim kami dapat memberikan informasi yang relevan."}>
    {status === "done" ? <div className="success-state"><span aria-hidden="true">✓</span><Button onClick={onClose}>Selesai</Button></div> : <form onSubmit={submit} className="ds-form">
      <Field><FieldLabel htmlFor={`${prefix}-student`} required>Nama siswa</FieldLabel><Input id={`${prefix}-student`} name="studentName" autoComplete="name" required data-autofocus/></Field>
      <div className="form-row"><Field><FieldLabel htmlFor={`${prefix}-parent`} required>Nama wali</FieldLabel><Input id={`${prefix}-parent`} name="parentName" autoComplete="name" required/></Field><Field><FieldLabel htmlFor={`${prefix}-phone`} required>WhatsApp wali</FieldLabel><Input id={`${prefix}-phone`} name="phone" inputMode="tel" autoComplete="tel" required aria-describedby={`${prefix}-phone-hint`}/><FieldHint id={`${prefix}-phone-hint`}>Contoh: 081234567890</FieldHint></Field></div>
      <Field><FieldLabel htmlFor={`${prefix}-school`} required>Asal sekolah</FieldLabel><Input id={`${prefix}-school`} name="school" required/></Field>
      <Field><FieldLabel htmlFor={`${prefix}-interest`} required>Tingkat ketertarikan</FieldLabel><Select id={`${prefix}-interest`} name="interestLevel" required defaultValue=""><option value="" disabled>Pilih salah satu</option><option>Sangat tertarik</option><option>Masih mempertimbangkan</option><option>Ingin konsultasi</option><option>Ingin melihat sekolah</option><option>Ingin mengetahui biaya</option><option>Siap mendaftar</option></Select></Field>
      {status === "error" && <FieldError>Belum berhasil dikirim. Periksa data lalu coba kembali.</FieldError>}
      <Button type="submit" loading={status === "sending"} size="lg">Kirim Minat</Button>
      <p className="ni-caption ni-muted">Data digunakan hanya untuk keperluan komunikasi SPMB.</p>
    </form>}
  </Dialog>;
}
