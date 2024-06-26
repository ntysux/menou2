'use client'
import SigninDialog from "@/components/auth/signin/signin.dialog"
import Empty from "@/components/empty"
import { useAppSelector } from "@/redux/hooks"
import { Comment } from "@/redux/menu.public/types"
import { url } from "@/utils/app.url"
import { Disclosure } from "@headlessui/react"
import { IconBrandTelegram, IconDiscountCheckFilled, IconMessage2 } from "@tabler/icons-react"
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies"
import { useParams } from "next/navigation"
import { ChangeEvent, useEffect, useRef, useState } from "react"

interface Props {
  uid: string
  comments: Comment[]
  cookie: RequestCookie | undefined
}

async function addComment(pid: string, uid: string, comment: string) {
  await fetch(`${url}/community/${pid}/api/comment/add`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({uid, comment})
  })
}

export default function Comment({uid, comments, cookie}: Props) {
  const
    {id}: {id: string} = useParams(),
    user = useAppSelector(state => state.user),
    textareaRef = useRef<HTMLTextAreaElement | null>(null),
    [comment, setComment] = useState({current: '', list: comments})

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [comment.current])
  
  function handleSetComment(event: ChangeEvent<HTMLTextAreaElement>) {
    setComment({...comment, current: event.target.value})
  }
  function handleCancel(close: () => void) {
    setComment({...comment, current: ''})
    close()
  }
  function handleAddComment() {
    if (comment.current.trim()) {
      setComment({list: [...comment.list, {user, comment: comment.current}], current: ''})
      addComment(id, user.id, comment.current.trim().replace(/ {2,}/g, ' '))
    }
    textareaRef.current?.focus()
  }
  function handleFocusTextarea() {
    setTimeout(() => {
      textareaRef.current?.focus()
    }, 100)
  }

  return (
    <>
      <h3 className="text-neutral-800 font-bold">
        Bình luận ({comment.list.length})
      </h3>
      {
        !cookie?.value &&
        <Empty>
          <Empty.Icon>
            <IconMessage2 size='29px' className="text-neutral-300" />
          </Empty.Icon>
          <Empty.Text className="mt-3 text-sm text-neutral-600 font-bold">
            Đăng nhập để bình luận
          </Empty.Text>
          <Empty.Text className="text-sm text-neutral-500">
            Bạn cần đăng nhập để sử dụng tính năng này.
          </Empty.Text>
          <SigninDialog>
            {setOpen =>
              <button 
                onClick={() => setOpen(true)}
                className="mt-3 px-3 py-1 rounded-sm w-fit flex mx-auto bg-neutral-800 text-sm text-white font-medium"
              >
                Đăng nhập
              </button>
            }
          </SigninDialog>
        </Empty>
      }
      {
        cookie?.value &&
        <div className="relative">
          <Disclosure>
            <Disclosure.Button 
              onClick={handleFocusTextarea}
              className="outline-none p-3 w-full cursor-text text-left text-sm text-neutral-300 font-medium rounded-xl hover:text-neutral-400"
            >
              Viết bình luận
            </Disclosure.Button>
            <Disclosure.Panel className="absolute top-0 w-full rounded-xl bg-neutral-950/75 backdrop-blur-[1px] overflow-hidden">
              {({close}) =>
                <>
                  <textarea 
                    ref={textareaRef}
                    value={comment.current}
                    rows={1}
                    placeholder="Viết bình luận..."
                    onChange={handleSetComment}
                    className="p-3 resize-none flex w-full outline-none bg-neutral-950/0 text-sm text-white font-medium placeholder:text-neutral-400"
                  />
                  <div className="py-2 px-3 flex items-center justify-end">
                    <button 
                      onClick={() => handleCancel(close)}
                      className="outline-none py-1 px-3 text-sm text-neutral-500 font-medium rounded-md hover:bg-neutral-700 hover:text-neutral-400"
                    >
                      đóng
                    </button>
                    <button 
                      onClick={handleAddComment}
                      className={`${comment.current.trim() ? 'text-neutral-300' : 'text-neutral-500 hover:text-neutral-400'} outline-none py-1 px-3 text-sm font-medium rounded-md hover:bg-neutral-700`}
                    >
                      bình luận
                    </button>
                  </div>
                </>
              }
            </Disclosure.Panel>
          </Disclosure>
        </div>
      }
      {
        !comment.list.length
        &&
        <Empty>
          <Empty.Icon>
            <IconBrandTelegram size='29px' className="text-neutral-300" />
          </Empty.Icon>
          <Empty.Text className="mt-3 text-sm text-neutral-600 font-bold">
            Chưa có bình luận
          </Empty.Text>
          <Empty.Text className="text-sm text-neutral-500">
            Hãy là người đầu tiên nhận xét về món ăn này
          </Empty.Text>
        </Empty>
      }
      {comment.list.map(({user, comment}, index) => 
        <div key={index}>
          <div className="flex items-center">
            {user.verified && <IconDiscountCheckFilled size='17px' className="text-cyan-400 mr-1" />}
            <h4 className="text-sm text-neutral-800 font-bold">
              {user.name}
            </h4>
            {
              uid === user.id &&
              <div className="ml-3 py-0.5 px-2 bg-neutral-300 rounded-md text-xs font-medium text-white">
                Tác giả
              </div>
            }
          </div>
          <p className="text-sm text-neutral-800 font-medium">
            {comment}
          </p>
        </div>
      )}
    </>
  )
}