'use client'

import { useMemo, useCallback} from "react";
import { createEditor, BaseEditor, Transforms, Element, Editor } from "slate";
import { Slate, Editable, withReact, ReactEditor } from "slate-react";
import Image from "next/image";
import { withHistory } from "slate-history";
import { Toolbar } from "./toolBar";

type CustomText = { text: string; bold?: boolean; italic?: boolean; underline?: boolean; h1?: boolean; h2?: boolean; color?: string };
type CustomElement = { type: 'paragraph' | 'code' | 'image' | 'list' | 'center' | 'left' | 'right' | null; children: CustomText[], url?: string, alt?: string };
type CustomEditor = BaseEditor & ReactEditor;

declare module 'slate' {
    interface CustomTypes {
        Editor: CustomEditor;
        Element: CustomElement;
        Text: CustomText;
    }
};

const initialValue: CustomElement[] = [
    {
        type: 'paragraph',
        children: [
            { text: "This is editable "},
            { text: "rich", bold: true },
            { text: " text, "},
            { text: "much", italic: true },
            { text: " better than a "},
            { text: "<textarea>"},
            { text: "!" },
        ],
    },
    {
        type: 'code',
        children: [{ text: "A line of code" }],
    },
    {
        type: 'image',
        children: [{ text: "Image"}],
        url : "/images/default-img.jpg",
        alt : "img",
    },
    {   
        type: 'list',
        children: [{ text: "A line of text in a list."}],
    },

   
];  
const CodeElement = (props: any) => {
    return (
        <pre {...props.attributes}>
        <code>{props.children}</code>
        </pre>
    );
};
const ParagraphElement = (props: any) => {
    return <p {...props.attributes}>{props.children}</p>;
};
const ListElement = (props: any) => {
    return <li {...props.attributes}>{props.children}</li>;
}
const CenterElement = (props: any) => {
    return <div className="text-center" {...props.attributes}>{props.children}</div>;
}
const RightElement = (props: any) => {
    return <div className="text-right" {...props.attributes}>{props.children}</div>;
}
const LeftElement = (props: any) => {
    return <div className="text-left" {...props.attributes}>{props.children}</div>;
}
const ImageElement = (props: any) => {
    const { attributes, children, element } = props;
    return (
        <div {...attributes} className="flex flex-row flex-wrap justify-center">
            <div contentEditable={false}>
                <Image
                    src={element.url}
                    alt="img"
                    width={250}
                    height={250}
                    style={{ display: "block" }}
                />
            </div>
        </div>
    );
};
const Leaf = (props: any) => {
    return (
        <span
        {...props.attributes}
        style={{
            fontWeight: props.leaf.bold ? "bold" : "normal",
            fontStyle: props.leaf.italic ? "italic" : "normal",
            textDecoration: props.leaf.underline ? "underline" : "none",
            fontSize: props.leaf.h1 ? "2em" :  props.leaf.h2 ? "1.5em" : "1em",
            color: props.leaf.color ? props.leaf.color : "black",
        }}
        >
        {props.children}
        </span>
    );
};

export const CustomEditor = {
    isBoldMarkActive(editor: CustomEditor) {
        const mark = Editor.marks(editor);
        return mark ? mark.bold === true : false;
    },
    toggleBoldMark(editor: CustomEditor) {
        const isActive = CustomEditor.isBoldMarkActive(editor);
        isActive ? Editor.removeMark(editor, "bold") : Editor.addMark(editor, "bold", true);
    },
    isItalicMarkActive(editor: CustomEditor) {
        const mark = Editor.marks(editor);
        return mark ? mark.italic === true : false;
    },
    toggleItalicMark(editor: CustomEditor) {
        const isActive = CustomEditor.isItalicMarkActive(editor);
        isActive ? Editor.removeMark(editor, "italic") : Editor.addMark(editor, "italic", true);
    },
    isUnderlineMarkActive(editor: CustomEditor) {
        const mark = Editor.marks(editor);
        return mark ? mark.underline === true : false;
    },
    toggleUnderlineMark(editor: CustomEditor) {
        const isActive = CustomEditor.isUnderlineMarkActive(editor);
        isActive ? Editor.removeMark(editor, "underline") : Editor.addMark(editor, "underline", true);
    },
    isHeading1Active(editor: CustomEditor){
        const mark = Editor.marks(editor)
        return mark ? mark.h1 === true : false;
    },
    toggleHeading1(editor: CustomEditor){
        const isActive = CustomEditor.isHeading1Active(editor);
        isActive ? Editor.removeMark(editor, "h1") : Editor.addMark(editor, "h1", true);
    },
    isHeading2Active(editor: CustomEditor){
        const mark = Editor.marks(editor)
        return mark ? mark.h2 === true : false;
    },
    toggleHeading2(editor: CustomEditor){
        const isActive = CustomEditor.isHeading2Active(editor);
        isActive ? Editor.removeMark(editor, "h2") : Editor.addMark(editor, "h2", true);
    },
    isTextColorActive(editor: CustomEditor) {
        const mark = Editor.marks(editor);
        return mark ? typeof mark.color === "string" : false;
    },
    toggleTextColor(editor: CustomEditor, color: string) {
        const isActive = CustomEditor.isTextColorActive(editor);
        isActive ? Editor.removeMark(editor, "color") : Editor.addMark(editor, "color", color);
    },
    isListActive(editor: CustomEditor){
        const [match] = Array.from(Editor.nodes(editor, {
            match: (n) => {
                const { type } = n as Element;
                return type === 'list';
            }
        }));
        return !!match;
    },
    toggleList(editor: CustomEditor){
        const isActive = CustomEditor.isListActive(editor);
        Transforms.setNodes(
            editor,
            { type: isActive ? 'paragraph' : 'list', children: [] },
            { match: n => Element.isElement(n), split: true }
        );
    },
    isTextLeftActive(editor: CustomEditor){
        const [match] = Array.of(Editor.nodes(editor, {
            match: (n) => {
                const { type } = n as Element;
                return type === 'left';
            }
        }));
        return !!match;
    },
    toggleTextLeft(editor: CustomEditor){
        const isActive = CustomEditor.isTextCenterActive(editor);
        Transforms.setNodes(
            editor,
            { type: isActive ? null : 'left', children: [] },
            { match: n => Element.isElement(n), split: true }
        );
    },
    isTextCenterActive(editor: CustomEditor){
        const [match] = Array.of(Editor.nodes(editor, {
            match: (n) => {
                const { type } = n as Element;
                return type === 'center';
            }
        }));
        return !!match;
    },
    toggleTextCenter(editor: CustomEditor){
        const isActive = CustomEditor.isTextCenterActive(editor);
        Transforms.setNodes(
            editor,
            { type: isActive ? null : 'center', children: [] },
            { match: n => Element.isElement(n), split: true }
        );
    },
    isTextRightActive(editor: CustomEditor){
        const [match] = Array.of(Editor.nodes(editor, {
            match: (n) => {
                const { type } = n as Element;
                return type === 'right';
            }
        }));
        return !!match;
    },
    toggleTextRight(editor: CustomEditor){
        const isActive = CustomEditor.isTextRightActive(editor);
        Transforms.setNodes(
            editor,
            { type: isActive ? null : 'right', children: [] },
            { match: n => Element.isElement(n), split: true }
        );
    },
    //! todo : insertImage and insertLink
    insertImage(editor: CustomEditor, url: string) {
        console.log('insertImage: ', url); // 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...'
        if(!url) return;
        const { selection } = editor;
        const image = { type: "image", url, children: [{ text: "" }] };

        ReactEditor.focus(editor);

       //if (!!selection) {
       //    const [parentNode, parentPath] = Editor.parent(editor, selection.focus?.path)
       //    if(editor.isVoid(parentNode) || Node.toString(parentNode).length) {
       //        Transforms.insertNodes(editor, image, { at: Path.next(parentPath), select: true });
       //    } else {
       //        Transforms.removeNodes(editor, { at: parentPath });
       //        Transforms.insertNodes(editor, image, { select: true });
       //    }
       //} else {
       //    Transforms.insertNodes(editor, image, { select: true });
       //}
    },
    insertLink(editor: CustomEditor, url: string) {
        const { selection } = editor;
        if (!url) return;
        const link = { type: "link", url, children: [{ text: "" }] };
    },  
    //! 
};

const OnKeyDown = (event: any, editor: CustomEditor) => {
    if (event.key === "&") {
        event.preventDefault();
        editor.insertText("and");
    }
    if (event.key === "Enter") {
      event.preventDefault();
      editor.insertText("\n");
    }
    if (!event.ctrlKey) {
        return;
    }
    switch (event.key) {
        case "b": {
            event.preventDefault();
            CustomEditor.toggleBoldMark(editor);
            break;
        }
        case "i": {
            event.preventDefault();
            CustomEditor.toggleItalicMark(editor);
            break;
        }
        case "u": {
            event.preventDefault();
            CustomEditor.toggleUnderlineMark(editor);
            break;
        }
    }
};

const withEmbeds = (editor: CustomEditor) => {
    const { insertData, isInline, isVoid } = editor;
    
    editor.insertData = (data) => {
        const text = data.getData("text/plain");
        console.log(text);        
        return insertData(data);
    }
    //editor.isInline = (element) => {
    //    return element.type === "image" ? true : isInline(element);
    //}
    //editor.isVoid = (element) => {
    //    return element.type === "image" ? true : isVoid(element);
    //}
    return editor;
};

const withImages = (editor: CustomEditor) => {
    const { insertData, isVoid } = editor;
    editor.isVoid = (element) => {
        return element.type === "image" ? true : isVoid(element);
    }
    return editor;
};


export const RichTextEditor = () => {
  const editor = useMemo(() => withImages(withEmbeds(withHistory(withReact(createEditor())))), []);

  const renderElement = useCallback((props : any) => {
    switch (props.element.type) {
        case 'code':
            return <CodeElement {...props} />;
        case 'image':
            return <ImageElement {...props} />;
        case 'list':
            return <ListElement {...props} />;
        case 'center' :
            return <CenterElement {...props}/>;
        case 'left':
            return <LeftElement {...props} />;
        case 'right':
            return <RightElement {...props} />;

      default:
        return <ParagraphElement {...props} />;
    }
  }, []);

  const renderLeaf = useCallback((props : any) => {
    return <Leaf {...props} />;
  }, []);



  return (
    <Slate editor={editor} initialValue={initialValue}
         onChange={(value) => {
             const isAstChange = editor.operations.some((op) => {
                 return op.type === "set_selection" || op.type === "insert_text" || op.type === "remove_text";
             }
             );
             if (isAstChange) {
                 const content = JSON.stringify(value);
                 localStorage.setItem("content", content);
                 console.log(localStorage.getItem("content"));
             }
         
         }}
    >
    
    <Toolbar editor={editor} />
    
      <Editable 
        className="border border-purple-300 p-2 w-full flex flex-col max-h-[15rem] overflow-hidden overflow-y-auto"
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Enter some plain text..."
        spellCheck
        autoFocus={true}
        onKeyDown={(event) => OnKeyDown(event, editor)}
        />

    </Slate>
    );
}
