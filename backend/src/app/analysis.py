import numpy as np


if __name__ == "__main__":
    A = np.array(
        [[1,2],
         [3,4],
         [5,6]]
    )

    A_array = np.array([A, A, A, A])

    print(np.sum(A_array, axis=(1, 2)).shape)
    print(np.sum(A_array, axis=(1,2)))