import { useEffect, Fragment, useState } from "react";
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

interface ColorListProps {
    colors: {
        data: Color[]
    },
    sha: string
}
// comment
interface Color {
    ColorID: number;
    Color: string;
    Hex: string;
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const setColor = (id: number, sha: string) => {
    console.log(id, sha);
    // post to colors endpoint that saves users color in mysql rds
}

export default function Dropdown(props: ColorListProps) {
    const [colors, setColors] = useState<Color[]>([]);
    useEffect(() => {
         (async function () {
            setColors(props.colors.data);
        })();
    }, [props.colors]);
    return (
        <><Menu as="div" className="absolute inline-block text-left">
            <div>
                <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                    Colors
                    <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0  mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        {colors.map((color: Color, index: number) => {
                            return <Menu.Item>
                            {({ active }) => (
                                <a
                                    onClick={() => setColor(color.ColorID, props.sha)}
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                    )}
                                >
                                    {color.Color}
                                </a>
                            )}
                        </Menu.Item>;
                        })}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu></>
    )
}