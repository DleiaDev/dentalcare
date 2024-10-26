import Header from "./Header";
import Table from "./Table";

type Props = {
  className?: string;
};

export default function Employees({ className }: Props) {
  return (
    <div className={className}>
      <Header />
      <Table />
    </div>
  );
}
