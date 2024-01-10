import { Children, ReactNode } from "react";

interface ForEachProps {
    render: (child: any, index: number) => ReactNode;
    of: any[] 
}


const forEach = ({ render, of }: ForEachProps) => {
    return Children.toArray(of.map((child, index) => render(child, index)));
}


export { forEach };


