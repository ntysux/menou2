'use client'
import { Comment } from "@/redux/menu.public/types"
import { IconDiscountCheckFilled, IconSend } from "@tabler/icons-react"
import { useParams } from "next/navigation"
import { ChangeEvent, useEffect, useState } from "react"
import Empty from "../empty"
import { url } from "@/utils/app.url"
import { useAppSelector } from "@/redux/hooks"

async function addComment(pid: string, uid: string, comment: string) {
  await fetch(`${url}/community/${pid}/api/comment`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({uid, comment})
  })
}

export default function Comment({comments}: {comments: Comment[]}) {
  const 
    {id: pid}: {id: string} = useParams(),
    user = useAppSelector(state => state.user)

  const
    [focus, setFocus] = useState(false),
    [commentState, setCommentState] = useState<{current: string, comments: Comment[]}>({
      current: '', 
      comments: [...comments.reverse()]
    })

  // fit height textarea by content
  useEffect(() => {
    const textarea = document.querySelector('#textarea') as HTMLTextAreaElement
    textarea.style.height = 'auto'
    if (commentState.current) {
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }, [commentState.current])

  function handleAddComment() {
    if (commentState.current.trim()) {
      const comment = commentState.current.trim().replace(/ {2,}/g, ' ')
      setCommentState({current: '', comments: [...commentState.comments, {comment, user}]})
      addComment(pid, user.id, comment)
    }
  }

  function handleSetTextarea(event: ChangeEvent<HTMLTextAreaElement>) {
    setCommentState({comments: commentState.comments, current: event.target.value})
  }

  function handleFocus() {
    setFocus(true)
  }

  function handleBlur() {
    !commentState.current && setFocus(false)
  }

  return (
    <div className="space-y-5">
      <h3 className="text-neutral-800 font-bold">
        Bình luận ({commentState.comments.length})
      </h3>
      <div className='relative py-[22px]'>
        <label
          htmlFor="textarea"
          onClick={handleFocus}
          className='pl-3 text-sm text-neutral-300 font-medium absolute inset-0 flex items-center cursor-text hover:text-neutral-400'
        >
          Viết bình luận
        </label>
        <div className={`${focus ? 'block' : 'hidden'} absolute top-0 w-full rounded-xl overflow-hidden bg-neutral-950/75 backdrop-blur-sm shadow-xl shadow-neutral-200`}>
          <textarea
            id="textarea"
            rows={1}
            value={commentState.current}
            onBlur={handleBlur}
            onChange={handleSetTextarea}
            placeholder="Viết bình luận"
            className="w-full bg-neutral-950/0 overflow-hidden p-3 resize-none outline-none text-sm text-white font-medium"
          />
          <div className="text-right p-1 w-full">
            <button 
              onClick={handleAddComment}
              disabled={commentState.current.trim() ? false : true}
              className='outline-none p-2 text-sky-400 disabled:opacity-50'
            >
              <IconSend size='18px' strokeWidth='2.3' /> 
            </button>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        {
          commentState.comments.length 
          ? commentState.comments.map((comment, index) => <CommentBox key={index} comment={comment} />) 
          : <Empty>Chưa có bình luận.</Empty>
        }
      </div>
    </div>
  )
}

function CommentBox({comment}: {comment: Comment}) {
  const {comment: text, user} = comment

  return (
    <div>
      <div className="flex items-center space-x-1">
        <p className="text-sm text-neutral-800 font-bold">
          {user.name}
        </p>
        {user.verified && <IconDiscountCheckFilled size='17px' className="text-sky-400" />}
      </div>
      <div className="p-1 px-3 text-sm text-neutral-800 font-medium">
        {text}
      </div>
    </div>
  )
}