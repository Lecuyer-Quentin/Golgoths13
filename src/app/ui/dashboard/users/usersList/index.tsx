'use client'

import { useMemo, useState, useCallback, useEffect } from 'react'
import { User as UserType } from '../../../../../../types';
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Button} from "@nextui-org/react";
import { FaRegEye } from "react-icons/fa6";
import { MdDeleteForever, MdOutlineSystemUpdateAlt } from "react-icons/md";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaSearch } from "react-icons/fa";
import {Input, DropdownTrigger, Dropdown, DropdownMenu, DropdownItem, Pagination, Selection, SortDescriptor} from "@nextui-org/react";
import Error from '@/app/utils/error/error';
import AddUser from '@/app/features/user/addUser';
import { useRouter } from 'next/navigation';
import DeleteUser from '@/app/features/user/deleteUser';
import { getSortedUsersData } from '@/libs/users';
import Loading from './loading';

  const columns = [
    {name: "NAME", uid: "name"},
    {name: "ROLE", uid: "role"},
    {name: "ACTIONS", uid: "actions"},
  ];


  type Props = {
   // data: UserType[];
   // error: Error | null;
   // reset: () => void;
  };


export default function UsersList(){

  const router = useRouter()
  
    const [filterValue, setFilterValue] = useState("");
    const [selectedKey, setSelectedKey] = useState<Selection>(new Set([]));
    const [rowPerPage, setRowPerPage] = useState(5);
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({column: "age", direction: "ascending"});
    const [page, setPage] = useState(1);
    const hasSearchFilter = Boolean(filterValue);
    const [data, setData] = useState<UserType[]>([])
    const [error, setError] = useState<Error | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    const getUsersData = async () => {
        try {
            const data = await getSortedUsersData()
            return data
        } catch (error) {
            return error
        }
    }

    useEffect(() => {
        getUsersData()
        .then((data) => {
            setData(data)
        })
        .catch((error) => {
            setError(error as Error)
        })
        .finally(() => {
            setLoading(false)
        })
    }
    , [ error ])


    const filteredData = useMemo(() => {
        let filteredUsers = data || [];
        if (hasSearchFilter) {
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
                    aria-label='User'
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
                <Dropdown className='border-2 border-black'>

                <DropdownTrigger>
                    <Button isIconOnly size="lg" variant="light">
                        <HiDotsHorizontal />
                    </Button>
                </DropdownTrigger>

                <DropdownMenu aria-label='User Actions'>
                    <DropdownItem aria-label='View Profile'>
                        <Button startContent={<FaRegEye />} className='w-full bg-transparent text-green-600'
                                onPress={() => router.push(`/users/${user._id}`)}
                        >
                            View Profile
                        </Button>
                    </DropdownItem>
                   
                    <DropdownItem aria-label='Update User'>
                        <Button startContent={<MdOutlineSystemUpdateAlt />} className='w-full bg-transparent text-blue-600'>
                            Update User
                        </Button>
                    </DropdownItem>

                    <DropdownItem aria-label='Delete User'>
                        <DeleteUser id={user._id} />
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
    if (error) return <Error error={error} reset={getUsersData} />
    if (loading) return <Loading />

    return(
        <div className="flex flex-col w-full h-full px-5 py-5 justify-center items-center">
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
                aria-label='Users Table'
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
