"use client";

import { useId, useState } from "react";
import { Icon } from "../../components/icons/Icon";
import { Button } from "../../components/ui/Button";
import { Dialog } from "../../components/ui/Dialog";
import { Field, FieldError, FieldHint, FieldLabel, Input, Select, Textarea } from "../../components/ui/Form";

export function DesignSystemDemo() {
  const [open, setOpen] = useState(false), prefix = useId();
  return <>
    <div className="ds-stack"><Button onClick={() => setOpen(true)}>Buka dialog <Icon name="arrow-up-right" size={16}/></Button><Button variant="secondary">Secondary</Button><Button variant="ghost">Ghost</Button><Button variant="danger">Danger</Button><Button loading>Loading</Button><Button disabled>Disabled</Button></div>
    <form className="ds-form" onSubmit={(event) => event.preventDefault()}>
      <Field><FieldLabel htmlFor={`${prefix}-name`} required>Nama siswa</FieldLabel><Input id={`${prefix}-name`} placeholder="Contoh: Ahmad Fauzan"/><FieldHint>Gunakan nama lengkap sesuai identitas.</FieldHint></Field>
      <Field><FieldLabel htmlFor={`${prefix}-topic`}>Topik</FieldLabel><Select id={`${prefix}-topic`} defaultValue=""><option value="" disabled>Pilih topik</option><option>Program</option><option>Biaya</option></Select></Field>
      <Field><FieldLabel htmlFor={`${prefix}-message`}>Pesan</FieldLabel><Textarea id={`${prefix}-message`} placeholder="Tuliskan pertanyaan Anda"/></Field>
      <Field><FieldLabel htmlFor={`${prefix}-error`}>Contoh error</FieldLabel><Input id={`${prefix}-error`} aria-invalid="true" aria-describedby={`${prefix}-error-message`}/><FieldError id={`${prefix}-error-message`}>Informasi ini perlu diperiksa kembali.</FieldError></Field>
    </form>
    <Dialog open={open} onClose={() => setOpen(false)} title="Diskusikan masa depan anak" description="Dialog ini mendemonstrasikan focus trap, Escape close, scroll lock, dan focus restoration."><p className="ni-body ni-muted">Gunakan Tab untuk berpindah kontrol. Tekan Escape untuk menutup.</p><div className="ds-stack"><Button data-autofocus onClick={() => setOpen(false)}>Saya mengerti</Button><Button variant="secondary" onClick={() => setOpen(false)}>Tutup</Button></div></Dialog>
  </>;
}
