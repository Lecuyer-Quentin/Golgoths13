import { Button, ButtonGroup, Input } from "@nextui-org/react";
import { ChangeEventHandler, useCallback, useRef } from "react";
import { FaAlignCenter, FaAlignLeft, FaAlignRight, FaBold, FaFileImage, FaItalic, FaLink, FaListUl, FaUnderline } from "react-icons/fa";
import { IoIosColorPalette } from "react-icons/io";
import { LuHeading1, LuHeading2 } from "react-icons/lu";
import { CustomEditor } from "./editor";


export const Toolbar = ({ editor }: any) => {
    const ButtonArray = [
        { icon: <LuHeading1 />,  action: CustomEditor.toggleHeading1 },
        { icon: <LuHeading2 />,  action: CustomEditor.toggleHeading2 },
        { icon: <FaBold />,  action: CustomEditor.toggleBoldMark },
        { icon: <FaItalic />,  action: CustomEditor.toggleItalicMark },
        { icon: <FaUnderline />,  action: CustomEditor.toggleUnderlineMark },
        { icon: <FaListUl />,  action: CustomEditor.toggleList },
        { icon: <FaAlignLeft />,  action: CustomEditor.toggleTextLeft },
        { icon: <FaAlignCenter />,  action: CustomEditor.toggleTextCenter },
        { icon: <FaAlignRight />,  action: CustomEditor.toggleTextRight },
        { icon: <FaLink />,  action: CustomEditor.insertLink },
    ];
    const InputButtonArray = [
        { icon: <FaFileImage />,  action: CustomEditor.insertImage, input: true, type: "file" },
        { icon: <IoIosColorPalette />,  action: CustomEditor.toggleTextColor, input: true, type: "color" },
    ];

    const ToolBarInputButton = (props: any) => {
        return (
            <Button className="relative" isIconOnly>
                <label htmlFor={props.type} className="absolute opacity-0 z-10">{props.type}</label>
                <Input 
                    type={props.type} 
                    className="absolute opacity-0 z-10"
                    onChange={event => {
                        event.preventDefault();
                        const value = event.target.value;
                        console.log(value);
                        props.action(editor, value);
                    }}
                />
                {props.icon}
            </Button>
        );
    }

    const ToolBarButton = (props: any) => {
        return (
            <Button isIconOnly onClick={event => {
                event.preventDefault();
                props.action(editor);
            }}>           
                {props.icon}
            </Button>
        );
    }
    const ToolBarGroupButton = (props: any) => {
        return (
            <ButtonGroup className="flex flex-row flex-wrap justify-center">
                {props.children}
            </ButtonGroup>
        );
    }

    const ToolBar = () => {
        return (
            <ToolBarGroupButton>
                {ButtonArray.map((button, index) => {
                    return (
                        <ToolBarButton key={index} icon={button.icon} action={button.action} />
                    );
                })}
                {InputButtonArray.map((button, index) => {
                    return (
                        <ToolBarInputButton key={index} icon={button.icon} action={button.action} type={button.type} />
                    );
                })}
            </ToolBarGroupButton>
        );
    }
    
  // const handleInsertImage : ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
  //     e.preventDefault();
  //     const input = refImg.current as HTMLInputElement;
  //     const file = input.files?.[0];
  //     //console.log(file);
  //     if (!file) return;
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //         const url = reader.result;
  //         console.log(url);
  //         CustomEditor.insertImage(editor, url as string);
  //     };
  //     const base64 = reader.readAsDataURL(file);
  //     console.log(base64);
  //     //{file && CustomEditor.insertImage(editor, URL.createObjectURL(file))}
  //     console.log(URL.createObjectURL(file));
  // }, []); 

  // const handleInsertLink = () => {
  //     const url = window.prompt("Enter the URL of the link:");
  //     if (!url) return;
  //     CustomEditor.insertLink(editor, url);
  // }


    return (
        <div className="flex flex-row flex-wrap justify-center">
            {ToolBar()}
        </div>
    );
}