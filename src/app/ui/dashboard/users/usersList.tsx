'use client'

import { useMemo, useState, useCallback } from 'react'
import { User as UserType } from '../../../../../types';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Button} from "@nextui-org/react";
import { FaRegEye } from "react-icons/fa6";
import { MdDeleteForever, MdOutlineSystemUpdateAlt } from "react-icons/md";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaSearch } from "react-icons/fa";
import {
    Input,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Pagination,
    Selection,
    SortDescriptor
  } from "@nextui-org/react";
import Error from '@/app/ui/error/error';
import AddUser from '@/app/features/user/addUser';

  const columns = [
    {name: "NAME", uid: "name"},
    {name: "ROLE", uid: "role"},
    {name: "ACTIONS", uid: "actions"},
  ];


  type Props = {
    data: UserType[];
    error: Error | null;
    reset: () => void;
  };


export default function UsersList({data, error, reset} : Props){
  
    const [filterValue, setFilterValue] = useState("");
    const [selectedKey, setSelectedKey] = useState<Selection>(new Set([]));
    const [rowPerPage, setRowPerPage] = useState(5);
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({column: "age", direction: "ascending"});
    const [page, setPage] = useState(1);
    const hasSearchFilter = Boolean(filterValue);

    const filteredData = useMemo(() => {
        let filteredUsers = [...data];
        if (hasSearchFilter) {
            console.log('hasSearchFilter', hasSearchFilter)
            console.log('filterValue', filterValue)
            filteredUsers = filteredUsers.filter((user : UserType) => {
                return user.name.toLowerCase().includes(filterValue.toLowerCase());
            });
        }
        return filteredUsers;
    }
    , [filterValue, hasSearchFilter, data]);

    const pages = Math.ceil(filteredData.length / rowPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowPerPage;
        const end = start + rowPerPage;
        return filteredData.slice(start, end);
    }, [filteredData, page, rowPerPage]);

    const sortedItems = useMemo(() => {
        return items.sort((a : any, b : any) => {
            let first = a[sortDescriptor.column as keyof UserType] as string
            let second = b[sortDescriptor.column as keyof UserType] as string
            let cmp = (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;
            if (sortDescriptor.direction === "descending") {
              cmp *= -1;
            }
            return cmp;
          });
    }, [items, sortDescriptor]);


   const renderCell = (user: UserType, column: {name: string, uid: string}) => {
    const cellValue = user[column.uid as keyof UserType] as string;

    switch (column.uid) {
        case 'name':
            return (
                <User
                    avatarProps={{ src: user.avatar, alt: 'avatar'}}
                    name={user.name ? user.name : 'No name'}
                    description={user.email}
                /> 
            );
      case 'role':
        return (
          <Chip color={(user.role === 'admin') && 'primary'
            || (user.role === 'editor') && 'secondary'
            || (user.role === 'writer') && 'secondary'
            || (user.role === 'user') && 'success'
            || (user.role === 'guest') && 'warning'
            || 'default'}   
            className=' mr-5'         
            >
            {user.role}
            </Chip>
        );
      case 'actions':
        return (
            <div className="relative flex justify-center items-center">
                <Dropdown>
                <DropdownTrigger>
                    <Button isIconOnly size="lg" variant="light">
                        <HiDotsHorizontal />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu>
                    <DropdownItem>
                        <Button startContent={<FaRegEye />} size="sm" variant="light">
                            View Profile
                        </Button>
                    </DropdownItem>
                    <DropdownItem>
                        <Button startContent={<MdDeleteForever />} size="sm" variant="light">
                              Delete User  
                        </Button>
                    </DropdownItem>
                    <DropdownItem>
                        <Button startContent={<MdOutlineSystemUpdateAlt />} size="sm" variant="light">
                            Update User
                        </Button>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
          </div>
        );
        default:
            return cellValue;
    }} 
    
      const onSearchChange = useCallback((value?: string) => {
        if (value) {
          setFilterValue(value);
          setPage(1);
        } else {
          setFilterValue("");
        }
      }, []);
    
      const onClear = useCallback(()=>{
        setFilterValue("")
        setPage(1)
      },[])

      const topContent = useMemo(() => {
        return (
          <div className="flex flex-col gap-4">
            <div className="flex justify-between gap-3 items-center">
              <Input
                isClearable
                className="w-full sm:max-w-[44%]"
                placeholder="Search by name..."
                startContent={<FaSearch />}
                value={filterValue}
                onClear={() => onClear()}
                onValueChange={onSearchChange}
              />
              <div className="flex gap-3">
                <AddUser />
              </div>
            </div>
          </div>
        );
      }, [filterValue, onSearchChange, onClear]);
    
      const bottomContent = useMemo(() => {
        return (
          <div className="py-2 px-2 flex justify-center items-center">
            <Pagination
              isCompact
              showControls
              color="default"
              page={page}
              total={pages}
              onChange={setPage}
            />
          </div>
        );
      }, [ page, pages]);

      if (!data) return <div>No users data</div>

    if (error) return <Error error={error} reset={reset} />

    return(
        <div className="flex flex-col w-full h-full px-5 py-5 justify-center items-center border-3 border-black">
            <Table 
                sortDescriptor={sortDescriptor} 
                onSortChange={setSortDescriptor}
                bottomContent={bottomContent} 
                bottomContentPlacement='outside'
                topContent={topContent}
                topContentPlacement='outside'
                selectedKeys={selectedKey}
                onSelectionChange={setSelectedKey}
                classNames={{ table: "min-h-[420px]"}}
            >
                <TableHeader>
                    {columns.map((column) => (
                        <TableColumn 
                            key={column.uid} allowsSorting={column.uid !== "actions"}
                            className={column.uid !== "name" ? "text-center w-10" : ""}
                        >
                            {column.name}
                        </TableColumn>
                    ))}
                </TableHeader>
                <TableBody emptyContent="No Users data" items={sortedItems}>
                    {sortedItems.map((item : UserType) => (
                        <TableRow key={item._id}>
                            {columns.map((column) => (
                                <TableCell 
                                    key={column.uid} 
                                    className={column.uid === "role" ? "text-center" : ""}
                                >
                                    {renderCell(item, column)}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
