import { Mahasiswa } from "@/constants/data";

export const postMahasiswa = async (data: Mahasiswa) => {
  const response = await fetch('/api/mahasiswa', {
    method: 'POST',
    body: JSON.stringify(data)
  })
  return await response.json()
}

export const getMahasiswa = async () => {
  const response = await fetch('/api/mahasiswa')
  return await response.json()
}

export const getMahasiswaById = async (id: string) => {
  const response = await fetch(`/api/mahasiswa/${id}`)
  return await response.json()
}

export const updateMahasiswa = async (data: Mahasiswa) => {
  const response = await fetch(`/api/mahasiswa/${data.id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  })
  return await response.json()
}

export const deleteMahasiswa = async (id: string) => {
  const response = await fetch(`/api/mahasiswa/${id}`, {
    method: 'DELETE'
  })
  return await response.json()
}
