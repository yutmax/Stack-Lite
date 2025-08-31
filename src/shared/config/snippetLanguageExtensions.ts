import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { go } from "@codemirror/lang-go";
import { StreamLanguage } from "@codemirror/language";
import { csharp, kotlin } from "@codemirror/legacy-modes/mode/clike";
import { ruby } from "@codemirror/legacy-modes/mode/ruby";
import type { Extension } from "@codemirror/state";

export const extensionFactories: Record<string, (() => Extension) | undefined> = {
  JavaScript: javascript,
  Python: python,
  Java: java,
  "C/C++": cpp,
  "C#": () => StreamLanguage.define(csharp),
  Go: go,
  Kotlin: () => StreamLanguage.define(kotlin),
  Ruby: () => StreamLanguage.define(ruby),
};

export function getLanguageExtension(name: string): Extension | undefined {
  const f = extensionFactories[name];
  return f ? f() : undefined;
}
