variable "vpc_cidr_block" {
  type    = string
  default = "10.0.1.0/24"
}

variable "public_subnets" {
  type    = list(string)
  default = ["10.0.1.0/28", "10.0.1.16/28"]
}

variable "tags" {
  type = object({
    Name = string
  })
  default = {
    Name = "Dentalcare-prod"
  }
}
