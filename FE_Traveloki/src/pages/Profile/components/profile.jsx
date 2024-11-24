function profile() {
  const colProfile = [
    {
      key: 'Full name',
      value: 'John Doe',
    },
    {
      key: 'Email address',
      value: 'johndoe@example.com',
    },
    {
      key: 'Phone number',
      value: '(123) 456-7890',
    },
    {
      key: 'Address',
      value: '123 Main St Anytown, USA 12345',
    },
  ];
  const rowProfile = colProfile.map((i) => (
    <div key={i}>
      <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-500">{i.key}</dt>
        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          {i.value}
        </dd>
      </div>
    </div>
  ));
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg border">
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">{rowProfile}</dl>
      </div>
    </div>
  );
}

export default profile;
