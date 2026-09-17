"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { useEffect } from "react";
import { Bold, Code2, Heading2, Heading3, Italic, Link2, List, ListOrdered, Minus, Quote, RotateCcw, RotateCw, Strikethrough, Text } from "lucide-react";

type Props = { value: string; onChange: (html: string) => void };

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

function Toolbar({ editor }: { editor: Editor }) {
  const setLink = () => {
    const current = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Paste a complete URL (https://…):", current ?? "");
    if (url === null) return;
    if (!url.trim()) editor.chain().focus().unsetLink().run();
    else editor.chain().focus().extendMarkRange("link").setLink({ href: url.trim() }).run();
  };
  return (
    <div className="sticky top-0 z-10 flex flex-wrap items-center gap-1 border-b border-[#e2e8f0] bg-[#fbfdfd]/95 p-2 backdrop-blur">
      <EditorButton editor={editor} label="Heading" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2 size={16} /></EditorButton>
      <EditorButton editor={editor} label="Subheading" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}><Heading3 size={16} /></EditorButton>
      <EditorButton editor={editor} label="Paragraph" active={editor.isActive("paragraph")} onClick={() => editor.chain().focus().setParagraph().run()}><Text size={16} /></EditorButton>
      <span className="mx-1 h-5 w-px bg-[#e2e8f0]" />
      <EditorButton editor={editor} label="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}><Bold size={16} /></EditorButton>
      <EditorButton editor={editor} label="Italic" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}><Italic size={16} /></EditorButton>
      <EditorButton editor={editor} label="Strikethrough" active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}><Strikethrough size={16} /></EditorButton>
      <EditorButton editor={editor} label="Inline code" active={editor.isActive("code")} onClick={() => editor.chain().focus().toggleCode().run()}><Code2 size={16} /></EditorButton>
      <EditorButton editor={editor} label="Link" active={editor.isActive("link")} onClick={setLink}><Link2 size={16} /></EditorButton>
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
      attributes: {
        class: "article-editor-content min-h-[500px] px-6 py-8 text-[16px] leading-8 text-[#334155] outline-none md:min-h-[580px] md:px-10 md:py-10",
        "aria-label": "Article body",
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) editor.commands.setContent(value || "", { emitUpdate: false });
  }, [editor, value]);

  if (!editor) return <div className="min-h-[360px] animate-pulse rounded-xl bg-[#f8fafc]" />;
  return (
    <div className="overflow-hidden rounded-xl border border-[#e2e8f0] bg-white focus-within:border-[#229388] focus-within:ring-2 focus-within:ring-[#229388]/10">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
      <div className="border-t border-[#e2e8f0] px-4 py-2 text-[11px] text-[#94a3b8]">Headings, lists, quotes, links, code and dividers are supported. Links open in a new tab on the public site.</div>
    </div>
  );
}
