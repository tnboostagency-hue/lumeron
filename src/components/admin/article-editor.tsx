"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { useEffect, useRef, useState } from "react";
import { Bold, Check, Code2, ExternalLink, Heading2, Heading3, Italic, Link2, List, ListOrdered, Minus, Quote, RotateCcw, RotateCw, Strikethrough, Text, Unlink, X } from "lucide-react";

type Props = { value: string; onChange: (html: string) => void };

const ALLOWED_PASTE_TAGS = new Set(["p", "h2", "h3", "strong", "em", "s", "code", "ul", "ol", "li", "blockquote", "a", "br", "hr"]);
const REMOVED_PASTE_TAGS = "script, style, noscript, iframe, object, embed, form, button, input, select, textarea, svg, canvas, nav, header, footer, aside";

/**
 * Converts copied web pages into the small semantic subset supported by the
 * newsroom. It removes foreign CSS/classes and repairs overly-bold pastes
 * before TipTap adds them to the document.
 */
function cleanPastedArticleHtml(html: string): string {
  if (typeof DOMParser === "undefined") return html;

  const document = new DOMParser().parseFromString(html, "text/html");
  document.body.querySelectorAll(REMOVED_PASTE_TAGS).forEach((node) => node.remove());

  const replacements: Record<string, string> = {
    h1: "h2",
    h4: "h3",
    h5: "h3",
    h6: "h3",
    b: "strong",
    i: "em",
  };

  Array.from(document.body.querySelectorAll("*")).reverse().forEach((element) => {
    let current = element;
    let tag = current.tagName.toLowerCase();
    const replacementTag = replacements[tag];

    if (replacementTag) {
      const replacement = document.createElement(replacementTag);
      while (current.firstChild) replacement.appendChild(current.firstChild);
      current.replaceWith(replacement);
      current = replacement;
      tag = replacementTag;
    }

    if (!ALLOWED_PASTE_TAGS.has(tag)) {
      current.replaceWith(...Array.from(current.childNodes));
      return;
    }

    const href = tag === "a" ? (current.getAttribute("href") ?? "").trim() : "";
    Array.from(current.attributes).forEach((attribute) => current.removeAttribute(attribute.name));

    if (tag === "a") {
      if (/^(https?:\/\/|mailto:)/i.test(href)) current.setAttribute("href", href);
      else current.replaceWith(...Array.from(current.childNodes));
    }
  });

  const bodyTextLength = (document.body.textContent ?? "").replace(/\s+/g, "").length;
  const boldTextLength = Array.from(document.body.querySelectorAll("strong"))
    .reduce((total, node) => total + (node.textContent ?? "").replace(/\s+/g, "").length, 0);

  if (bodyTextLength > 0 && boldTextLength / bodyTextLength > 0.8) {
    document.body.querySelectorAll("strong").forEach((node) => node.replaceWith(...Array.from(node.childNodes)));
  }

  return document.body.innerHTML;
}

function EditorButton({ editor, label, active, onClick, children }: { editor: Editor; label: string; active?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={`grid h-9 min-w-9 place-items-center rounded-lg px-2 text-xs font-semibold transition-colors ${active ? "bg-[#229388] text-white shadow-sm" : "text-[#475569] hover:bg-[#eef8f7] hover:text-[#229388]"}`}
    >
      {children}
    </button>
  );
}

function normalizeLink(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const candidate = /^(https?:\/\/|mailto:)/i.test(trimmed) ? trimmed : `https://${trimmed}`;

  try {
    const parsed = new URL(candidate);
    return ["http:", "https:", "mailto:"].includes(parsed.protocol) ? candidate : null;
  } catch {
    return null;
  }
}

function LinkManager({ editor }: { editor: Editor }) {
  const [open, setOpen] = useState(false);
  const [href, setHref] = useState("");
  const [selectionLabel, setSelectionLabel] = useState("");
  const [error, setError] = useState("");
  const managerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const linkActive = editor.isActive("link");

  const openManager = () => {
    const { from, to } = editor.state.selection;
    const selectedText = editor.state.doc.textBetween(from, to, " ").trim();
    const currentHref = String(editor.getAttributes("link").href ?? "");
    setHref(currentHref);
    setSelectionLabel(selectedText || (linkActive ? "Linked text" : "No text selected"));
    setError("");
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();

    const handlePointerDown = (event: PointerEvent) => {
      if (!managerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const saveLink = () => {
    const normalized = normalizeLink(href);
    if (!normalized) {
      setError("Enter a valid website or email link.");
      return;
    }

    const chain = editor.chain().focus();
    if (linkActive && editor.state.selection.empty) chain.extendMarkRange("link");
    chain.setLink({ href: normalized }).run();
    setOpen(false);
  };

  const removeLink = () => {
    const chain = editor.chain().focus();
    if (editor.state.selection.empty) chain.extendMarkRange("link");
    chain.unsetLink().run();
    setOpen(false);
  };

  const canAddLink = linkActive || !editor.state.selection.empty;
  const previewHref = normalizeLink(href);

  return (
    <div className="relative" ref={managerRef}>
      <button
        type="button"
        title="Manage link"
        aria-label="Manage link"
        aria-expanded={open}
        onClick={openManager}
        className={`grid h-9 min-w-9 place-items-center rounded-lg px-2 text-xs font-semibold transition-colors ${linkActive ? "bg-[#229388] text-white shadow-sm" : "text-[#475569] hover:bg-[#eef8f7] hover:text-[#229388]"}`}
      >
        <Link2 size={16} />
      </button>

      {open ? (
        <div className="fixed inset-x-3 top-24 z-50 mx-auto w-auto max-w-[380px] rounded-2xl border border-[#dbe7e5] bg-white p-4 text-left shadow-[0_22px_60px_rgba(15,81,76,0.22)] sm:absolute sm:inset-x-auto sm:left-0 sm:top-[calc(100%+10px)] sm:mx-0 sm:w-[360px]">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#229388]">{linkActive ? "Edit link" : "Add link"}</p>
              <p className="mt-1 truncate text-[13px] text-[#64748b]" title={selectionLabel}>{selectionLabel}</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close link manager" className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#111827]"><X size={16} /></button>
          </div>

          {canAddLink ? (
            <form className="mt-3" onSubmit={(event) => { event.preventDefault(); saveLink(); }}>
              <label htmlFor="article-link-url" className="text-[12px] font-semibold text-[#334155]">Destination</label>
              <div className="mt-1.5 flex items-center rounded-xl border border-[#cbd5e1] bg-white px-3 focus-within:border-[#229388] focus-within:ring-2 focus-within:ring-[#229388]/10">
                <Link2 size={15} className="shrink-0 text-[#94a3b8]" />
                <input ref={inputRef} id="article-link-url" value={href} onChange={(event) => { setHref(event.target.value); setError(""); }} placeholder="example.com/page" inputMode="url" autoComplete="url" className="min-w-0 flex-1 bg-transparent px-2 py-2.5 text-[14px] text-[#111827] outline-none placeholder:text-[#94a3b8]" />
              </div>
              {error ? <p role="alert" className="mt-1.5 text-[12px] font-medium text-red-600">{error}</p> : <p className="mt-1.5 text-[11px] leading-4 text-[#94a3b8]">Web addresses open in a new tab. You can also use mailto: links.</p>}

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <button type="submit" className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-[#229388] px-3.5 text-[12px] font-bold text-white transition-colors hover:bg-[#197c73]"><Check size={14} /> {linkActive ? "Update link" : "Add link"}</button>
                {linkActive ? <button type="button" onClick={removeLink} className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-red-200 px-3 text-[12px] font-semibold text-red-600 hover:bg-red-50"><Unlink size={14} /> Unlink</button> : null}
                {linkActive && previewHref ? <a href={previewHref} target="_blank" rel="noopener noreferrer" className="ml-auto inline-flex h-9 items-center gap-1.5 px-2 text-[12px] font-semibold text-[#229388] hover:underline"><ExternalLink size={14} /> Open</a> : null}
              </div>
            </form>
          ) : (
            <div className="mt-3 rounded-xl bg-[#f0f9f8] p-3 text-[12px] leading-5 text-[#476862]">Select the words you want to link, then open this manager again.</div>
          )}
        </div>
      ) : null}
    </div>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  return (
    <div className="sticky top-0 z-10 flex max-w-full flex-wrap items-center gap-1 border-b border-[#e2e8f0] bg-[#fbfdfd]/95 p-2 backdrop-blur">
      <EditorButton editor={editor} label="Heading" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2 size={16} /></EditorButton>
      <EditorButton editor={editor} label="Subheading" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}><Heading3 size={16} /></EditorButton>
      <EditorButton editor={editor} label="Paragraph" active={editor.isActive("paragraph")} onClick={() => editor.chain().focus().setParagraph().run()}><Text size={16} /></EditorButton>
      <span className="mx-1 h-5 w-px bg-[#e2e8f0]" />
      <EditorButton editor={editor} label="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}><Bold size={16} /></EditorButton>
      <EditorButton editor={editor} label="Italic" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}><Italic size={16} /></EditorButton>
      <EditorButton editor={editor} label="Strikethrough" active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}><Strikethrough size={16} /></EditorButton>
      <EditorButton editor={editor} label="Inline code" active={editor.isActive("code")} onClick={() => editor.chain().focus().toggleCode().run()}><Code2 size={16} /></EditorButton>
      <LinkManager editor={editor} />
      <span className="mx-1 h-5 w-px bg-[#e2e8f0]" />
      <EditorButton editor={editor} label="Bulleted list" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}><List size={16} /></EditorButton>
      <EditorButton editor={editor} label="Numbered list" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered size={16} /></EditorButton>
      <EditorButton editor={editor} label="Quote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}><Quote size={16} /></EditorButton>
      <EditorButton editor={editor} label="Divider" onClick={() => editor.chain().focus().setHorizontalRule().run()}><Minus size={16} /></EditorButton>
      <span className="mx-1 h-5 w-px bg-[#e2e8f0]" />
      <EditorButton editor={editor} label="Undo" onClick={() => editor.chain().focus().undo().run()}><RotateCcw size={16} /></EditorButton>
      <EditorButton editor={editor} label="Redo" onClick={() => editor.chain().focus().redo().run()}><RotateCw size={16} /></EditorButton>
    </div>
  );
}

export default function ArticleEditor({ value, onChange }: Props) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit, Link.configure({ openOnClick: false, autolink: true, HTMLAttributes: { class: "text-[#229388] underline underline-offset-4" } })],
    content: value,
    onUpdate: ({ editor: instance }) => onChange(instance.getHTML()),
    editorProps: {
      transformPastedHTML: cleanPastedArticleHtml,
      transformPastedText: (text) => text.replace(/\r\n?/g, "\n").replace(/\n{3,}/g, "\n\n"),
      attributes: {
        class: "article-editor-content min-h-[360px] px-5 py-6 text-[16px] leading-8 text-[#334155] outline-none sm:min-h-[500px] sm:px-6 sm:py-8 md:min-h-[580px] md:px-10 md:py-10",
        "aria-label": "Article body",
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) editor.commands.setContent(value || "", { emitUpdate: false });
  }, [editor, value]);

  if (!editor) return <div className="min-h-[360px] animate-pulse rounded-xl bg-[#f8fafc]" />;
  return (
    <div className="relative rounded-xl border border-[#e2e8f0] bg-white focus-within:border-[#229388] focus-within:ring-2 focus-within:ring-[#229388]/10">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
      <div className="border-t border-[#e2e8f0] px-4 py-2 text-[11px] leading-5 text-[#94a3b8]">Paste freely from Word or other websites—we automatically remove foreign fonts, colors, oversized text and broken bold formatting. Headings, lists, quotes and safe links are preserved.</div>
    </div>
  );
}
