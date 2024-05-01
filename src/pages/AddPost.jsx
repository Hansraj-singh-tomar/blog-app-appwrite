// eslint-disable-next-line no-unused-vars
import React from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import Select from '../components/Select'

const AddPost = () => {
    return (
        <div className='mx-auto max-w-6xl mt-8 p-4'>
            <div className='flex'>
                {/* left side part */}
                <div className='space-y-6 flex-1 pr-4'>
                    <Input label="Title" type='text' className='' />
                    <Input label="Slug" type='text' className='' />
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Content
                        </label>
                        <div className="mt-2">
                            <textarea
                                id="name"
                                name="name"
                                type="name"
                                required
                                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                </div>

                {/* right side part */}
                <div className='flex-2 pl-4 space-y-8'>
                    <Input label="Feature Image :" type='file' className='' />

                    <Select options={["active", "inactive"]} />

                    <Button>
                        Update
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AddPost
