def countGroups(related):
    groups = []
    poeple_who_know_someone = []
    for line_index, line in enumerate(related):
        for column_index in range(len(line)):
            if line_index == column_index:
                pass
            elif int(line[column_index]) and line_index not in poeple_who_know_someone and column_index not in poeple_who_know_someone:
                groups.append({line_index, column_index})
                poeple_who_know_someone.append(line_index)
                poeple_who_know_someone.append(column_index)
                +0.
            elif int(line[column_index]) and line_index not in poeple_who_know_someone:
                for group in groups:
                    if column_index in group:
                        group.add(line_index)
                        poeple_who_know_someone.append(line_index)
                        break
            elif int(line[column_index]) and column_index not in poeple_who_know_someone:
                for group in groups:
                    if line_index in group:
                        group.add(column_index)
                        poeple_who_know_someone.append(column_index)
                        break
    poeple_who_know_someone = sum([len(group) for group in groups])
    return len(related)-poeple_who_know_someone+len(groups)

print(countGroups(['1100', '1110', '0110', '0001']))

# !/bin/python3

import math
import os
import random
import re
import sys


#
# Complete the 'countGroups' function below.
#
# The function is expected to return an INTEGER.
# The function accepts STRING_ARRAY related as parameter.
#
class Graph:
    def __init__(self, V):
        self.V = V
        self.adj = [[] for i in range(V)]

    def addRelation(self, v, w):
        v -= 1        w -= 1
        self.adj[v].append(w)
        self.adj[w].append(v)

    def countUtil(self, v, visited):
        count = 1
        visited[v] = True
        i = 0
        while i != len(self.adj[v]):
            if (not visited[self.adj[v][i]]):
                count = count + self.countUtil(self.adj[v][i],
                                               visited)
            i += 1
        return count

    def countGroups(self):
        visited = [0] * self.V

        existing_groups = 0
        new_groups = 1
        for i in range(self.V):

            if (visited[i] == False):
                existing_groups += 1
                new_groups = (new_groups *
                              self.countUtil(i, visited))

        if (existing_groups == 1):
            new_groups = 0

        return existing_groups


def countGroups(related):
    g = Graph(len(related))
    for line_index, line in enumerate(related):
        for column_index in range(len(line)):
            if line_index == column_index:
                pass
            if int(line[column_index]):
                g.addRelation(line_index, column_index)
    return g.countGroups()


if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    related_count = int(input().strip())

    related = []

    for _ in range(related_count):
        related_item = input()
        related.append(related_item)

    result = countGroups(related)

    fptr.write(str(result) + '\n')

    fptr.close()
