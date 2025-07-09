import { defineStore } from 'pinia'

export interface User {
  id: string
  display_name: string
  country: string
  email: string
  external_urls: Record<string, string>
  images: Record<string, string>[]
  product: string
  uri: string
  type: string
  href: string
}

export const useUserStore = defineStore('user', {
  state: () => ({
    userId: '',
    displayName: '',
    country: '',
    email: '',
    externalUrl: '',
    profilePictureLink: '',
    product: '',
    uri: '',
    type: '',
    href: '',
  }),
  actions: {
    setUser(user: User) {
      this.userId = user.id
      this.displayName = user.display_name
      this.country = user.country
      this.email = user.email
      this.externalUrl = user.external_urls.spotify
      this.profilePictureLink = user.images[0].url
      this.product = user.product
      this.uri = user.uri
      this.type = user.type
      this.href = user.href
    },
    clearUser() {
      this.userId = ''
      this.displayName = ''
      this.country = ''
      this.email = ''
      this.externalUrl = ''
      this.profilePictureLink = ''
      this.product = ''
      this.uri = ''
      this.type = ''
      this.href = ''
    }
  }
})
