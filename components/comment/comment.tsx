'use client'
import { Comment } from "@/redux/menu.public/types"
import { IconDiscountCheckFilled, IconSend } from "@tabler/icons-react"
import { useParams } from "next/navigation"
import { ChangeEvent, useState } from "react"

const url = process.env.NEXT_PUBLIC_APP_URL

async function addComment(pid: string, uid: string, comment: string) {
  await fetch(`${url}/community/${pid}/api/comment`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({uid, comment})
  })
}

export default function Comment({
  currentUser, 
  commentList
}: {
  currentUser: {id: string, name: string, verified: boolean}, 
  commentList: Comment[]
}) {
  const {id}: {id: string} = useParams(),
    [focus, setFocus] = useState(false),
    [commentValue, setCommentValue] = useState(''),
    [comments, setComments] = useState<Comment[]>(commentList)

  function handleAddComment() {
    if (commentValue.trim()) {
      setComments([{comment: commentValue.trim().replace(/ {2,}/g, ' '), user: currentUser}, ...comments])
      setCommentValue('')
      addComment(id, currentUser.id, commentValue.trim().replace(/ {2,}/g, ' '))
    }
  }

  function handleSetComment(event: ChangeEvent<HTMLTextAreaElement>) {
    setCommentValue(event.target.value)
  }

  return (
    <div className="space-y-5 mb-20">
      <h3 className="text-neutral-800 font-bold">
        Bình luận ({comments.length})
      </h3>
      <div className={`${focus ? 'ring-2 ring-neutral-800' : 'ring-1 ring-neutral-300'} rounded-sm`}>
        <textarea
          value={commentValue}
          placeholder='Viết bình luận'
          className="p-3 w-full resize-none outline-none text-sm text-neutral-800 font-medium sticky bottom-0"
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={handleSetComment}
        />
        <div className="text-right p-1">
          <button 
            className="p-2 text-sky-400 rounded-full hover:bg-sky-100"
            onClick={handleAddComment}
          >
            <IconSend size='18px' strokeWidth='2.3' /> 
          </button>
        </div>
      </div>
      <div className="space-y-3">
        {
          comments.length 
          ? 
          comments.map((comment, index) => 
            <div 
              key={index} 
              className="space-y-1"
            >
              <div className="flex items-center space-x-1">
                <p className="text-sm text-neutral-800 font-bold">
                  {comment.user.name}
                </p>
                {comment.user.verified && <IconDiscountCheckFilled size='17px' className="text-sky-400" />}
              </div>
              <p className="p-1 px-3 text-sm text-neutral-500 font-medium">
                {comment.comment}
              </p>
            </div>
          ) 
          : 
          <Empty />
        }
      </div>
    </div>
  )
}

function Empty() {
  return (
    <div className="p-9 border border-dashed border-neutral-300 rounded-lg text-center text-sm text-neutral-400 font-medium">
      <h4>Chưa có bình luận</h4>
      <p>Hãy là người đầu tiên bình luận về món ăn này.</p>
    </div>
  ) 
}