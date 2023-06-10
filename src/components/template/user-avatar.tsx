import { Loader2, User } from "lucide-react"
import { UserProfile } from "./user-profile"
import { api } from "~/utils/api"

export const UserAvatar = (): JSX.Element => {
  const { data, isLoading } = api.user.me.useQuery()
  return (
    <>
      {isLoading ? (
        <Loader2 size={24} className="animate-spin" />
      ) :
        data && !!data.image ? (
          <UserProfile image={data.image} />
        ) : (
          <User />
        )}
    </>
  )
}
