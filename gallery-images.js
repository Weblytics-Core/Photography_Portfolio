// Gallery images array with all 48 images from the images folder
const galleryImages = [
    {
        path: 'https://drive.google.com/thumbnail?id=10ebKjm_dVud8ySPuQzfPaaKfcFoQIHPW&sz=w1000',
        title: 'Image-1',
        price: 0.00,
    },
    {
        path: 'https://drive.google.com/thumbnail?id=11j5Ynm4sCW62Zqd17NI5eIraDTAU-tWt&sz=w1000',
        title: 'Image-2',
        price: 0.00,
    },
    {
        path: 'https://drive.google.com/thumbnail?id=11yvBpo7GGzl0sTm8NEjLK4qahTOj5-wa&sz=w1000',
        title: 'Image-3',
        price: 0.00,
    },
    {
        path: 'https://drive.google.com/thumbnail?id=125F5EDqCameZOHSBdfr57vToUvJBFXrF&sz=w1000',
        title: 'Image-4',
        price: 0.00,
    },
    {
        path: 'https://drive.google.com/thumbnail?id=12kmZCcY58W18i-_y5RcdyqYY7307yUcQ&sz=w1000',
        title: 'Image-5',
        price: 0.00,
    },
    {
        path: 'https://drive.google.com/thumbnail?id=14X6wu_7Za527X56bXaczSu6xartMyHL0&sz=w1000',
        title: 'Image-6',
        price: 0.00,
    },
    {
        path: 'https://drive.google.com/thumbnail?id=15IJ6biI2mQiN7mnNcdmx8W7f9CHuIHcJ&sz=w1000',
        title: 'Image-7',
        price: 0.00,
    },
    {
        path: 'https://drive.google.com/thumbnail?id=15Ph-0yQbf_rOle-HMPXIv9vgwFEeJe_E&sz=w1000',
        title: 'Image-8',
        price: 0.00,
    },
    {
        path: 'https://drive.google.com/thumbnail?id=173bk07VYaY15cjtJowGyYQNz5YK0PD02&sz=w1000',
        title: 'Image-9',
        price: 0.00,
    },
    {
        path: 'https://drive.google.com/thumbnail?id=175JRzmjq1kTj9Buci7kXzn79OZtfTUp_&sz=w1000',
        title: 'Image-10',
        price: 0.00,
    },
    {
        path: 'https://drive.google.com/thumbnail?id=17CzkT_nMrOjxKRe3E_Plq3xFjP3Qin4z&sz=w1000',
        title: 'Image-11',
        price: 0.00,
    },
    {
        path: 'https://drive.google.com/thumbnail?id=1ACRYxQ2LzoH_42NvlA814j1Twk5sNHBp&sz=w1000',
        title: 'Image-12',
        price: 0.00,
    },
    {
        path: 'https://drive.google.com/thumbnail?id=1A_wbCRSKCPnqwZ12BAukkvSOxLEphCLr&sz=w1000',
        title: 'Image-13',
        price: 0.00,
    },
    {
        path: 'https://drive.google.com/thumbnail?id=1BkLH0INRJBvV-YnW5Fe82S9pRZltjSQn&sz=w1000',
        title: 'Image-14',
        price: 0.00,
    },
    {
        path: 'https://drive.google.com/thumbnail?id=1CRXRsRxLfsT0BAlkJdyDUnr9UsMu3372&sz=w1000',
        title: 'Image-15',
        price: 0.00,
    },
    {
        path: 'https://drive.google.com/thumbnail?id=1EPzRACeZFtkEaoiAyNqgzysxwhNLuOp7&sz=w1000',
        title: 'Image-16',
        price: 0.00,
    },
    {
        path: 'https://drive.google.com/thumbnail?id=1LIo4ZspacekWp6VRGO9VNMcQA6gO7xop&sz=w1000',
        title: 'Image-17',
        price: 0.00,
    },
    {
        path: 'https://drive.google.com/thumbnail?id=1LQP7gr2ow428f21Zn--ENP0nZTMgKy3I&sz=w1000',
        title: 'Image-18',
        price: 0.00,
    },
    {
        path: 'https://drive.google.com/thumbnail?id=1MB1dwnAAHw2K702pGn3zgthX078gVk9n&sz=w1000',
        title: 'Image-19',
        price: 0.00,
    },
    {
        path: 'https://drive.google.com/thumbnail?id=1OVmKjVRz4BCTD0OX1IqJsi2ptIrKM5po&sz=w1000',
        title: 'Image-20',
        price: 0.00,
    },
    {
        path: 'https://drive.google.com/thumbnail?id=1SOnwVPI9A6GnLfUJo3te0DKHhD5d_2cT&sz=w1000',
        title: 'Image-21',
        price: 0.00,
    },
    {
        path: 'https://drive.google.com/thumbnail?id=1SUzTErZfZEc-Di09TTlEA2gRbT0R99wO&sz=w1000',
        title: 'Image-22',
        price: 0.00,
    },
    {
        path: 'https://drive.google.com/thumbnail?id=1Wt_evGcgmN2k0mOUqcpJ9sR1VJ2YL7E-&sz=w1000',
        title: 'Image-23',
        price: 0.00,
    },
    {
        path: 'https://drive.google.com/thumbnail?id=1YXjJe0t3cHk1D6mf5KUKJMRNVVzxQT9F&sz=w1000',
        title: 'Image-24',
        price: 0.00,
    },
    {
        path: 'https://drive.google.com/thumbnail?id=1aloQidPqcoXOgCzpzSHnRPa21mIL_795&sz=w1000',
        title: 'Image-25',
        price: 0.00,
    },
    {
        path: 'https://drive.google.com/thumbnail?id=1bBUkAhXBsUaq2zWtDaH_dtdwyeDJp86z&sz=w1000',
        title: 'Image-26',
        price: 0.00,
    },
    {
        path: 'https://drive.google.com/thumbnail?id=1clM1mo9AfrOdvMJ1tWF4xjknqQbNgzUM&sz=w1000',
        title: 'Image-27',
        price: 0.00,
    },
    {
        path: 'https://drive.google.com/thumbnail?id=1fJIcgsSZhp0m8jH8PuOMNVsqs4sS2jkP&sz=w1000',
        title: 'Image-28',
        price: 0.00,
    },
    {
        path: 'https://drive.google.com/thumbnail?id=1hj9mnLL01NENUJbkMNLv-50RfmmCGyUf&sz=w1000',
        title: 'Image-29',
        price: 0.00,
    },
    {
        path: 'https://drive.google.com/thumbnail?id=1jKmalFDCJyOBEMOa0Cpp7t76LVj3ADT8&sz=w1000',
        title: 'Image-30',
        price: 0.00,
    },
    {
        path: 'https://drive.google.com/thumbnail?id=1jPAASp9CEOzJOPnbDueVQiHTe8qPnNTJ&sz=w1000',
        title: 'Image-31',
        price: 0.00,
    },
    {
        path: 'https://drive.google.com/thumbnail?id=1jPzahvTvc2dy8_jS45KWV5yFyL6RSOrM&sz=w1000',
        title: 'Image-32',
        price: 0.00,
    },
    {
        path: 'https://drive.google.com/thumbnail?id=1kmOENCIk_8OrLw16B0AfnJXbniLykb8R&sz=w1000',
        title: 'Image-33',
        price: 0.00,
    },
    {
        path: 'https://drive.google.com/thumbnail?id=1m2InpIA6XzcB686iTMUYdjbJQ_Cg8fqt&sz=w1000',
        title: 'Image-34',
        price: 0.00,
    },
    {
        path: 'https://drive.google.com/thumbnail?id=1m6Q7c7u-UvtAv-Vl_nvXXPOTL7VrkBvr&sz=w1000',
        title: 'Image-35',
        price: 0.00,
    },
    {
        path: 'https://drive.google.com/thumbnail?id=1nmbeDxCh1OpBXlu7UVshw6sjUXkgJiTK&sz=w1000',
        title: 'Image-36',
        price: 0.00,
    },
    {
        path: 'https://drive.google.com/thumbnail?id=1oD57UikzW95CAqVeCTI5CZP45vbrKdA3&sz=w1000',
        title: 'Image-37',
        price: 0.00,
    },
    {
        path: 'https://drive.google.com/thumbnail?id=1oHayPgF0DYWhKj0owEajqDtRNlxrQi6K&sz=w1000',
        title: 'Image-38',
        price: 0.00,
    },
    {
        path: 'https://drive.google.com/thumbnail?id=1oZCXfUfE16SV3XNNlDnWQckwN1kjiggD&sz=w1000',
        title: 'Image-39',
        price: 0.00,
    },
    {
        path: 'https://drive.google.com/thumbnail?id=1q310mvjhpqp8IxQ6uXctZVgZfuCCN0gP&sz=w1000',
        title: 'Image-40',
        price: 0.00,
    },
    {
        path: 'https://drive.google.com/thumbnail?id=1tPawrYlsnMNTjxRH533t51Ti0hAyFTJk&sz=w1000',
        title: 'Image-41',
        price: 0.00,
    },
    {
        path: 'https://drive.google.com/thumbnail?id=1vk_TgComjtYAacG3HrT-zd4RJnXaf3YC&sz=w1000',
        title: 'Image-42',
        price: 0.00,
    },
    {
        path: 'https://drive.google.com/thumbnail?id=1w-MZAqmWNx_z3tXtwgCjfN9KxyMe3ccK&sz=w1000',
        title: 'Image-43',
        price: 0.00,
    },
    {
        path: 'https://drive.google.com/thumbnail?id=1wl-qnJFL5FQsSjZRmexMT7s1NqmADiYj&sz=w1000',
        title: 'Image-44',
        price: 0.00,
    },
    {
        path: 'https://drive.google.com/thumbnail?id=1wsu6y41x7i-TbLcvS5-B-XX0Wv-VRgC0&sz=w1000',
        title: 'Image-45',
        price: 0.00,
    },
    {
        path: 'https://drive.google.com/thumbnail?id=1x1_rvAnbNS3GMrNcwIvQSzfecZXYQlZv&sz=w1000',
        title: 'Image-46',
        price: 0.00,
    },
    {
        path: 'https://drive.google.com/thumbnail?id=1xBrBjoRlyY28ZWXo-rSRb0hE3OvU5W-k&sz=w1000',
        title: 'Image-47',
        price: 0.00,
    },
    {
        path: 'https://drive.google.com/thumbnail?id=1xQ6XwX8in1UlfazfceMNcrWEVy8FqntG&sz=w1000',
        title: 'Image-48',
        price: 0.00,
    },
    {
        path: 'https://drive.google.com/thumbnail?id=1xcHz3JHW2w4kHVdDxwWddNFSVeLJkPPs&sz=w1000',
        title: 'Image-49',
        price: 0.00,
    },
    {
        path: 'https://drive.google.com/thumbnail?id=1yl6axyN8egrwoouGVXZfqHtSjPnxWqy1&sz=w1000',
        title: 'Image-50',
        price: 0.00,
    },
    {
        path: 'https://drive.google.com/thumbnail?id=1zFTEq53EKF_6CDcdtEvEGPdTF0IFZ9-m&sz=w1000',
        title: 'Image-51',
        price: 0.00,
    },
    {
        path: 'https://drive.google.com/thumbnail?id=1ziHCEcMGNh_6Rd_tS7aV69iqJkM0uJxl&sz=w1000',
        title: 'Image-52',
        price: 0.00,
    },
]; 