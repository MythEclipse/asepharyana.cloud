import { ReactNode } from 'react';
import Box from './Box';

const BoxContainer = ({ children }: { children: ReactNode }) => {
    return (
        <div className="w-full px-4 flex flex-wrap justify-center xl:w-10/12 xl:mx-auto">
            {children}
        </div>
    );
}
export default BoxContainer;